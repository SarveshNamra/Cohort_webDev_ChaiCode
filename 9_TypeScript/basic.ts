let x: number | null;
x = null;
x = 44;
console.log(x);

function createUser(user: { firstname: String; lastname?: String}){
    // 1st approach
    const trimmedLastName = user.lastname?.trim()
    
    // 2nd approach
    if(user.lastname) {
        const trimmed = user.lastname.trim();
    }

    // 3rd approach
    if(!user.lastname) return;
    const trimmedName = user.lastname.trim();

    // 4th approach
    const trimmedLast = user.lastname.trim() || '';
}

createUser({
    firstname: "San"
})

let a: String;
interface User {
    firastname: String;
    lastname?: String;
    email: String;
    profileImageURL?: String;
}

function updateUser(a: User){}

const payload: User = {
    firastname: '',
    email: '',
}

updateUser(payload);