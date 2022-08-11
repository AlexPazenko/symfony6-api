import {baseURL} from '../src/config.js'
import {email} from '../src/config.js'
import {password} from '../src/config.js'

export class Register {

    static register()
    {
        let params = new URLSearchParams()
        params.append('email', email)
        params.append('password', password)

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        axios.post(baseURL+'/register', params, config)
            .then((response) => {
                console.log(response.data)
            }).catch((error) => {
            console.log(error)
        })
    }
}
