import React,{useState} from 'react'
import Modal from '../Components/Modal';
import CircularProgress from '@material-ui/core/CircularProgress'; // Import CircularProgress from Material-UI
import '../index.css';

const Home = () => {


    const [pdfUrl, setPdfUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading,setLoading]=useState(false)

   
    const onClick = async () => {
        try {
            setLoading(true); // Set loading to true when starting the fetch

          const response = await fetch('http://localhost:3002/getPDF', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/pdf',
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch PDF');
          }
    //use blob to store large quantiy of space and be able ot work with it/ help us work with binary
    const blob = await response.blob();
    const url=URL.createObjectURL(blob)
    //console.log('test1')
          
         setPdfUrl(url)
         //console.log('test2')
         setIsModalOpen(true);
        } catch (error) {
          console.error('Error generating PDF:', error);
        }finally {
            setLoading(false); // Set loading to false whether success or error
          }
      };
    
      const closeModal = () => {
        setPdfUrl(null);
        setIsModalOpen(false);
      };

      


  return (
    <div className='container'>

        {/* button to GET pdf */}
      <button className='btn' onClick={onClick} disabled={loading}>
        Get PDF
      </button>

     
      <div className="spinner">
      {loading && <CircularProgress/>}
      </div>
      <Modal  isOpen={isModalOpen} onClose={closeModal} pdfUrl={pdfUrl} loading={loading} />
    </div>
  )
}

export default Home