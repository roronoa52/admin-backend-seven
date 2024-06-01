import React from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { Image, Spinner } from 'react-bootstrap';
import moment from 'moment';
import '../../App.css'; // Import the CSS file

function TbodyWithAction({
  data,
  display,
  editUrl,
  deleteAction,
  customAction,
  actionNotDisplay,
  status,
  handleReject,
  handleSuccess
}) {
  const navigate = useNavigate();

  moment.locale('id')
  
  const formatPrice = (price) => {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <tbody>
      {status === 'process' ? (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: 'center' }}>
            <div className='flex items-center justify-center'>
              <Spinner animation='border' variant='primary' />  
            </div>
          </td>
        </tr>
      ) : data.length ? (
        data.map((row, index) => {
          return (
            <tr key={index}>
              {Object.keys(row).map(
                (key) =>
                  display.indexOf(key) > -1 && (
                    <td key={key} className={key === 'image' ? 'fixed-width' : 'flexible-width'}>
                      {key === 'image' ? (
                        <a href={`data:${row.image.typeImage};base64,${row.image.dataImage}`} target="_blank" rel="noopener noreferrer">
                          <Image
                            height={100}
                            width={100}
                            src={`data:${row.image.typeImage};base64,${row.image.dataImage}`}
                            alt="Bank Image"
                          />
                        </a>
                      ) : key === 'startDate' || key === 'endDate' ? (
                        moment(row[key]).format('DD MMMM YYYY, HH:mm:ss')
                      ) : key === 'total' ? (
                        formatPrice(row[key])
                      ) : key === 'product' ? (
                        row[key].name
                      ) : key === 'admin' ? (
                        row[key].name
                      ) : (
                        row[key]
                      )}
                    </td>
                  )
              )}
              {!actionNotDisplay && (
                <td className='flexible-width'>
                  {customAction && customAction(row._id, row.statusEvent)}
                  {editUrl && (
                    <Button
                      variant='success'
                      size={'sm'}
                      action={() => navigate(`${editUrl}/${row._id}`)}
                    >
                      Edit
                    </Button>
                  )}
                  {deleteAction && (
                    <Button
                      className={'mx-2'}
                      variant='danger'
                      size={'sm'}
                      action={() => deleteAction(row._id)}
                    >
                      Hapus
                    </Button>
                  )}
                  {handleReject && (
                    <Button
                      className={'mx-2'}
                      variant='danger'
                      size={'sm'}
                      action={() => handleReject(row._id)}
                    >
                      Ditolak
                    </Button>
                  )}
                  {handleSuccess && (
                    <Button
                      className={'mx-2'}
                      variant='success'
                      size={'sm'}
                      action={() => handleSuccess(row._id)}
                    >
                      Berhasil
                    </Button>
                  )}
                </td>
              )}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: 'center' }}>
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TbodyWithAction;
