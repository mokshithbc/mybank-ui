import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function InquireAccountForm({ token, onSuccess }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [account, setAccount] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!accountNumber) return toast.error('Enter account number');

        try {
            const res = await axios.get(
                `https://localhost:8080/account/api/accounts/${accountNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setAccount(res.data);
            toast.success('Account found!');
            if (onSuccess) onSuccess(res.data.accountNumber);
        } catch (error) {
            setAccount(null);
            toast.error('Account not found');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input
                type="number"
                placeholder="Account Number"
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
            />
            <button type="submit">Find Account</button>
            {account && (
                <div className="result">
                    <p><strong>Account No:</strong> {account.accountNumber}</p>
                    <p><strong>Status:</strong> {account.status}</p>
                    <p><strong>Type:</strong> {account.accountType}</p>
                    <p><strong>Balance:</strong> {account.balance}</p>
                    <p><strong>Customer ID:</strong> {account.customerId}</p>
                </div>
            )}
        </form>
    );
}

export default InquireAccountForm;
