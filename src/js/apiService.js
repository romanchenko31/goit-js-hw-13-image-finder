    const KEY_API = '29920184-cb57a37281186e19b397ef599';
    const URL = 'pixabay.com/api';


 const fetchUsers = async (values, pageNumber) => {
    try {
        const response = await fetch(`https://${URL}/?image_type=photo&q=${values}&orientation=horizontal&page=${pageNumber}&per_page=12&key=${KEY_API}`);
        const users = await response.json();
        return users;
    }catch(error) {
        console.log('hello',error);
    }
    
}
export default fetchUsers;