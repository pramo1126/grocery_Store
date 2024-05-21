
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const AdminCustomCard = ({ productId, productName, ImageSrc, description, }) => {

    const [isHovered, setIsHovered] = useState(false);

    const handleEdit = () => {
      
    };

    const handleDelete = () => {
        
    };


    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Card
                style={{
                    width: '18rem',
                    cursor: 'pointer',
                    boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                    transition: 'box-shadow 0.3s'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <Card.Img
                        variant="top"
                        src={ImageSrc}
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'contain',
                        }}
                    />
                </div>
                <Card.Body>
                    <Card.Title style={{ fontSize: '14px', textAlign: 'center' }}>{productName}</Card.Title>
                    <Card.Text style={{ fontSize: '13px', textAlign: 'center' }}>{description}</Card.Text>
                    <Button variant="warning" style={{ marginRight: '10px' }} onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    

                </Card.Body>
            </Card>
        </div>
    );  
};

export default AdminCustomCard;