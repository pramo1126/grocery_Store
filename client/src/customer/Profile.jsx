

const Profile = () => {

     const styles = {
    bgImage: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    },
    imgFluid: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    mask: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textWhite: {
      color: 'white',
      marginBottom: 0
    }
  };

  return (
        <div style={styles.bgImage}>
            <img
                src="https://mdbcdn.b-cdn.net/img/new/standard/city/053.webp"
                style={styles.imgFluid}
                alt="Sample"
            />
            <div style={styles.mask}>
                <p style={styles.textWhite}>Welcome to Sameera Grocery Store</p>
            </div>
        </div>
    );
};
export default Profile
