import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    let ref = useRef();
    let passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard' + text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        // alert("Show the password")
        passwordRef.current.type = "text"
        if (ref.current.src.includes("eyecross.svg")) {
            ref.current.src = "/icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "/icons/eyecross.svg"
        }

    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            setform({ site: "", username: "", password: "" })
            // toast('Copied to clipboard', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",

            // });
        }

    };

    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

        // const updatedPasswords = [...passwordArray, {...form, id: uuidv4()}];
        // setPasswordArray(updatedPasswords);
        // console.log(...updatedPasswords)
        // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    };

    const deletePassword = (id) => {
        console.log("Deleting password with id: ", id)
        let c = confirm("Are you sure you want to delete this password!")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
        }
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="p-2 pt-3 md:mycontainer min-h-[83.9vh]">
                <h1 className="text-4xl font-bold text-center">
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/ &gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">Your own Password Manager</p>
                <div className="flex flex-col items-center p-4 text-black gap-8">
                    <input value={form.site} onChange={handleChange} placeholder="Enter Website URL" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" id="site" name="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" id="username" name="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-500 w-full p-4 py-1" type="password" id="password" name="password" />
                            <span className="absolute right-[5px] top-[1px] cursor-pointer" onClick={showPassword}><img ref={ref} className="p-1" src="/icons/eye.svg" width={30} alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords To Show</div>}

                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className="bg-green-800 text-white">
                            <tr>
                                <th className="py-2">Site</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">Password</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-green-100">
                            {passwordArray.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center border border-white w-1/3 py-2">
                                            <div className="flex justify-center items-center gap-2 cursor-pointer">
                                                <a href="{item.site}" target="_blank"> {item.site} </a>
                                                <img src="icons/copy.svg" onClick={() => { copyText(item.site) }} className="copy w-4" alt="" />
                                            </div>
                                        </td>
                                        <td className="text-center border border-white py-2">
                                            <div className="flex justify-center items-center gap-2 cursor-pointer">
                                                {item.username}<img src="icons/copy.svg" onClick={() => { copyText(item.username) }} className="copy w-4" alt="" />
                                            </div>
                                        </td>
                                        <td className="text-center border border-white py-2">
                                            <div className="flex justify-center items-center gap-2 cursor-pointer">
                                                {item.password}<img src="icons/copy.svg" onClick={() => { copyText(item.password) }} className="copy w-4" alt="" />
                                            </div>
                                        </td>
                                        <td className="text-center border border-white py-2">
                                            <span className="mx-1" onClick={() => { editPassword(item.id) }}><lord-icon
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                            <span className="mx-1" onClick={() => { deletePassword(item.id) }}><lord-icon
                                                src="https://cdn.lordicon.com/drxwpfop.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    );
};

export default Manager;
