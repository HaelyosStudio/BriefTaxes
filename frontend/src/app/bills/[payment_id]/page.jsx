"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface JwtPayload {
    username: string;
    sub: string;
    exp: number;
}

const Bills = () => {
    const router = useRouter();
    const { payment_id } = useParams();
    const [bills, setBills] = useState<any>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [billsNotFound, setBillsNotFound] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) { 
            localStorage.removeItem('token'); 
            router.push('/login'); 
        } else {
            const fetchBills = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/bills?page=1&payment_id=${payment_id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    if (data['hydra:member'].length > 0) {
                        setBills(data['hydra:member'][0]);
                    } else {
                        setBillsNotFound(true);
                    }
                } catch (error) {
                    console.error('Error fetching bills:', error);
                    setBillsNotFound(true);
                }
            };

            if (payment_id) {
                fetchBills();
            }

            if (token) {
                const decodedToken = jwtDecode<JwtPayload>(token);
                const email = decodedToken.username;
                getCurrentUser(email);
            }
        }
    }, [payment_id]);

    const getCurrentUser = async (email: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users?page=1&email=${email}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data['hydra:member'].length > 0) {
                setCurrentUser(data['hydra:member'][0].id);
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const handlePayBills = async () => {
        if (bills && currentUser) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/fines/${bills.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/ld+json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        ...bills,
                        email: `/api/users/${currentUser}`,
                        pay: true
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to pay bills');
                }
                setBills({ ...bills, pay: true });
            } catch (error) {
                console.error('Error paying bills:', error);
            }
        }
    };

    const isTokenExpired = (token: string) => {
        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.exp * 1000 < new Date().getTime();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                {fineNotFound ? (
                    <div className="text-center">
                        <p className="text-red-500 mb-4">Cette amende n'existe pas</p>
                        <Link href="/" className="mt-6 bg-blue-500 text-white px-4 py-2 rounded text-center">Retour au profil</Link>
                    </div>
                ) : bills ? (
                    <div className="space-y-4">
                        <div>
                            <p className="block text-gray-700 mb-2">Amende numéro : {bills.payment_id}</p>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-2">Raison de l'amende : {bills.name}</p>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-2">Description : {bills.description}</p>
                        </div>
                        <div>
                            <p className="block text-gray-700 mb-2">Prix : {bills.value}</p>
                        </div>
                        {!bills?.pay && (
                            <button onClick={handlePayBills} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">Payer</button>
                        )}
                        {bills?.pay && (
                            <p className="mt-6 text-green-500">Cette amende a déjà été payée</p>
                        )}
                    </div>
                ) : (
                    <p className="text-center">Chargement...</p>
                )}
            </div>
        </div>
    );
};

export default Bills;
