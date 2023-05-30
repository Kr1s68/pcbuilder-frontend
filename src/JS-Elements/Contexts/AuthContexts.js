import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';


const AuthContext = React.createContext()

export function useAuth(){

    return useContext(AuthContext)

}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
       return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user){
                const obj = {...user};
                fetch(`https://pc-builder-api.herokuapp.com/api/data/checkAdmin`,{ 
               body:JSON.stringify({email:user.email}),
               method:"post",
               headers:{
                "Content-Type":"application/json"
               }
            }).then((response) => {
                setLoading(false);
                response.json().then(body => {
                    setCurrentUser({...obj._delegate, isAdmin: body.isAdmin})
                }).catch(e => {
                    setCurrentUser({...obj._delegate, isAdmin: false})
                })
            }).catch(e => {
                setLoading(false)
                setCurrentUser({...obj._delegate, isAdmin: false})
            })
        }else{
            setCurrentUser(user)
            setLoading(false)  
        }     
        })
        return () => unsubscribe()
    },[])

   

    const value = {

        currentUser,
        signup,
        login,
        logout

    }


    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

