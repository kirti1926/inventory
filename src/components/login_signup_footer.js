import React from 'react';
import '../css/login_signup_footer.css'

class LoginSignupFooter extends React.Component {
    state = {}
    render() {
        return <div>
            <hr></hr>
            <footer className="text-muted">
                <div className="container">
                    <p className="justify-content-center ">&copy; Inventory , 2020</p>
                </div>
            </footer>

        </div>
    }
}

export default LoginSignupFooter;