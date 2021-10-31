export default async function home_main_after_auth(){
    const home = await import('./home.js')
    home.default()
}