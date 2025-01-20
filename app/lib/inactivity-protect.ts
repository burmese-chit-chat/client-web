export default async function inactivity_protect() {
    try {
        const auth_service = process.env.AUTH_SERVICE || '';
        const browse_service = process.env.BROWSE_SERVICE || '';

        const [ res_1 , res_2 ] = await Promise.all([
            fetch(auth_service, { next : { revalidate : 180 }}), 
            fetch(browse_service, { next : { revalidate : 180 }})
        ]);
        console.log('the responses', res_1, res_2);
        console.log('inactivity protection successfully');
    } catch (e) {
       console.log(e);
       console.log('error in inactivity protection'); 
    }
}