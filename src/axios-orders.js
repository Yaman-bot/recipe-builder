import axios from 'axios'

const instance=axios.create({
    baseURL:'https://burger-builder-a96e5.firebaseio.com/'
})

export default instance