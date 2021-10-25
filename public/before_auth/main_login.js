export default async function login_main(){
    console.log('xd')
    const login_button = await import('./login_button.js')
    login_button.default()
}