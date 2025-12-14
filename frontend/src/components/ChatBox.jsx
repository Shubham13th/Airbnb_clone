import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatBox = ({ recipientId, currentUserId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Connect to Socket.io
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        // Join room
        newSocket.emit('join', currentUserId);

        // Listen for incoming messages
        newSocket.on('new_message', (message) => {
            if (
                (message.sender._id === recipientId && message.recipient._id === currentUserId) ||
                (message.sender._id === currentUserId && message.recipient._id === recipientId)
            ) {
                setMessages((prev) => [...prev, message]);
            }
        });

        return () => newSocket.close();
    }, [currentUserId, recipientId]);

    useEffect(() => {
        // Fetch conversation history
        const fetchMessages = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const res = await fetch(`http://localhost:5000/api/messages/${recipientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [recipientId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const token = localStorage.getItem('accessToken');
        try {
            const res = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    recipientId,
                    content: newMessage,
                }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', width: '300px', height: '400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'scroll', marginBottom: '10px' }}>
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        style={{
                            textAlign: msg.sender._id === currentUserId ? 'right' : 'left',
                            margin: '5px 0',
                        }}
                    >
                        <span
                            style={{
                                backgroundColor: msg.sender._id === currentUserId ? '#007bff' : '#f1f1f1',
                                color: msg.sender._id === currentUserId ? 'white' : 'black',
                                padding: '5px 10px',
                                borderRadius: '10px',
                                display: 'inline-block',
                            }}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{ flex: 1, padding: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 10px' }}>Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
