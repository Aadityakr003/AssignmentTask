import React, { useEffect, useState } from 'react'
import { contractInstance } from '../../contracts/contractInstance'
import { useConnectWallet } from '@web3-onboard/react';
import { toast } from 'react-toastify';

export default function Task() {
    const [{ wallet }] = useConnectWallet();
    const [string, setString] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const [defaultValue, setDefaultValue] = useState('')

    useEffect(() => {

        if (wallet) {

            handleGetString()
        }
        return () => {

        }
    }, [wallet])
    const handleGetString = async () => {
        try {


            const contratc = await contractInstance(wallet?.provider)
            console.log("contratc:", contratc)
            let _string = await contratc.getString()
            console.log("_string:", _string)
            setDefaultValue(_string)
        } catch (error) {
            console.log("error:", error)

        }
    }
    const handleSetString = async () => {
        if (!wallet) {
            return toast.error("Please connect your wallet first")
        }
        if (!string) {
            return toast.error("Enter value first")
        }
        try {
            setIsloading(true)
            const _contract = await contractInstance(wallet?.provider)
            const _updateString = await _contract.setString(string)
            const wait = await _updateString.wait()
            if (wait) {
                toast.success("String changed successfully")
                setIsloading(false)
                handleGetString()
                setString('')
            }

        } catch (error) {
            setIsloading(false)

            console.log("error:", error)

        }

    }

    return (
        <>
            <div className="container mt-3">
                <div className="row d-flex justify-content-center border">
                    <div className="col-6">
                        <p className='text-center text-light fs-3'>Current String : {defaultValue}</p>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label text-white">Enter String</label>
                            <input type="text" value={string} onChange={(e) => setString(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Enter string" />
                            {isLoading ?

                                <div class="spinner-border text-light mt-2" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                :
                                <button className='btn btn-primary mt-2' onClick={handleSetString}>Set string</button>
                            }                       </div>
                    </div>
                </div>
            </div>
        </>
    )
}
