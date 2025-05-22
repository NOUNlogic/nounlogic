'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/CardComponents';
import Button from '@/components/ui/Button';

const Web3Client = () => {
  const [connected, setConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('certificates');

  // Mock data for certificates
  const certificates = [
    {
      id: '1',
      name: 'Introduction to Web3',
      issueDate: '2023-05-15',
      tokenId: '12345',
      contractAddress: '0x1234...5678',
      network: 'Ethereum',
      image: 'https://via.placeholder.com/400x300/4f46e5/ffffff?text=Web3+Certificate',
    },
    {
      id: '2',
      name: 'Smart Contract Development',
      issueDate: '2023-07-22',
      tokenId: '67890',
      contractAddress: '0x9876...5432',
      network: 'Polygon',
      image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Smart+Contract+Certificate',
    },
    {
      id: '3',
      name: 'DeFi Fundamentals',
      issueDate: '2023-09-10',
      tokenId: '24680',
      contractAddress: '0xabcd...ef12',
      network: 'Ethereum',
      image: 'https://unsplash.com/photos/a-bitcoin-sitting-on-top-of-a-pile-of-gold-coins-piiqiVnhJkM',
    },
  ];

  // Mock data for transactions
  const transactions = [
    {
      id: '1',
      type: 'Certificate Mint',
      hash: '0x1234...5678',
      date: '2023-05-15',
      status: 'Completed',
      network: 'Ethereum',
    },
    {
      id: '2',
      type: 'Certificate Mint',
      hash: '0x9876...5432',
      date: '2023-07-22',
      status: 'Completed',
      network: 'Polygon',
    },
    {
      id: '3',
      type: 'Profile Update',
      hash: '0xabcd...ef12',
      date: '2023-08-30',
      status: 'Completed',
      network: 'Ethereum',
    },
    {
      id: '4',
      type: 'Certificate Mint',
      hash: '0xefgh...ijkl',
      date: '2023-09-10',
      status: 'Completed',
      network: 'Ethereum',
    },
  ];

  const connectWallet = () => {
    // Simulate wallet connection
    setConnected(true);
  };

  const disconnectWallet = () => {
    // Simulate wallet disconnection
    setConnected(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Web3 Integration</h1>
          <p className="text-muted-foreground">
            Manage your blockchain certificates and wallet connections
          </p>
        </div>

        {/* Wallet card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Wallet Connection</h2>
                <p className="text-muted-foreground mt-1">
                  Connect your wallet to access blockchain features
                </p>
              </div>
              {connected ? (
                <div className="flex items-center gap-4">
                  <div className="bg-success/20 text-success px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <span className="h-2 w-2 rounded-full bg-success mr-2"></span>
                    Connected
                  </div>
                  <div className="font-mono text-sm bg-secondary px-3 py-1 rounded">
                    0x71C7...F9E2
                  </div>
                  <Button variant="outline" onClick={disconnectWallet}>
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button onClick={connectWallet}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('certificates')}
              className={`pb-2 pt-2 px-1 font-medium ${
                activeTab === 'certificates'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Certificates
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`pb-2 pt-2 px-1 font-medium ${
                activeTab === 'transactions'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Transactions
            </button>
          </div>
        </div>

        {/* Certificate tab content */}
        {activeTab === 'certificates' && (
          <div>
            {connected ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((certificate) => (
                    <Card key={certificate.id} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={certificate.image}
                          alt={certificate.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                          {certificate.network}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{certificate.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Issued</span>
                            <span>{certificate.issueDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Token ID</span>
                            <span className="font-mono">{certificate.tokenId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Contract</span>
                            <span className="font-mono">{certificate.contractAddress}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Verify
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {certificates.length === 0 && (
                  <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">No certificates yet</h3>
                    <p className="text-muted-foreground mt-1">
                      Complete courses to earn blockchain certificates
                    </p>
                    <Button variant="outline" className="mt-4">
                      Browse Courses
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Connect your wallet</h3>
                <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                  Connect your Ethereum wallet to view and manage your blockchain certificates
                </p>
                <Button className="mt-4" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Transactions tab content */}
        {activeTab === 'transactions' && (
          <div>
            {connected ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 font-medium">Type</th>
                            <th className="text-left p-3 font-medium">Hash</th>
                            <th className="text-left p-3 font-medium">Date</th>
                            <th className="text-left p-3 font-medium">Network</th>
                            <th className="text-left p-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-border">
                              <td className="p-3">{tx.type}</td>
                              <td className="p-3 font-mono">{tx.hash}</td>
                              <td className="p-3">{tx.date}</td>
                              <td className="p-3">{tx.network}</td>
                              <td className="p-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/20 text-success">
                                  {tx.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {transactions.length === 0 && (
                  <div className="text-center py-12 bg-card rounded-lg border border-border">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">No transactions yet</h3>
                    <p className="text-muted-foreground mt-1">
                      Blockchain transactions will appear here
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Connect your wallet</h3>
                <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                  Connect your Ethereum wallet to view your transaction history
                </p>
                <Button className="mt-4" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Web3Client;