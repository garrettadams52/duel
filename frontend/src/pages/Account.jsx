export default function Account({user}){
    console.log(user)
    return <div>
    <h1>Account Details</h1>
        <ul>
            <li>Username/Email: {user['username']}</li>
            <li>First Name: {user['first_name']}</li>
            <li>Last Name: {user['last_name']}</li>
            <li>Date Joined: {user['date_joined']}</li>
        </ul>

    </div>
}