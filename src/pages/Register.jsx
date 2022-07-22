import React, { useState } from 'react';

function Register() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
  return (
        <div className="mx-auto my-10 w-96">
        <p className="text-3xl first-letter:font-bold text-center">BookStore</p>
        <form className="border rounded-lg my-5 p-5 flex flex-col gap-5">
            <p className="text-xl">Sign Up</p>

            <div className="felx flex-col">
                    <p className="pb-1">E-mail address</p>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="border rounded-lg py-1 px-2 w-full" />                        
            </div>

            <div className="felx flex-col">
                    <p className="pb-1">Password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="border rounded-lg py-1 px-2 w-full" />                        
            </div>

            <button type="submit" className="border rounded-lg p-1 bg-amber-300 hover:bg-amber-400 hover:font-bold">Register</button>
            <p className="text-xs">By continuing, you agree to BookStore Conditions of Use
        and Privacy Notice.
            </p>
        </form>
</div>
  )
}

export default Register