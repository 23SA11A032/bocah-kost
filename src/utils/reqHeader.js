export default function reqHeader() {
    var user = localStorage.getItem('user');
    user = JSON.parse(user);
    return {
        headers: {
            'Authorization': 'Bearer ' + user.token
        }
    }
}