import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiCalendar, FiImage, FiFileText, FiUsers, FiSettings, FiAward, FiMessageSquare, FiUser, FiLock } from 'react-icons/fi';
import { TbLogout } from "react-icons/tb";
import Navbar from '../components/Navbar';
import { FaNewspaper } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import {  FiUpload } from 'react-icons/fi';

const COPYRIGHT_TEXT = `All rights reserved © DSI Samson Rubber Industries - Information Technology Department`;

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('carousel');
    const [activeApplication, setActiveApplication] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message

    // State for carousel data from API
    const [carouselImages, setCarouselImages] = useState([]);
    const [carouselForm, setCarouselForm] = useState({ title: '', image: null });
    const [previewImage, setPreviewImage] = useState(null);

    // States for news data from API
    const [news, setNews] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);

    // States for calendar events data from API
    const [events, setEvents] = useState([]);
    const [eventForm, setEventForm] = useState({ title: '', description: '', eventDate: '', image: null });
    const [searchQuery, setSearchQuery] = useState('');

    // States for achievement data from API
    const [achievements, setAchievements] = useState([]);
    const [achievementForm, setAchievementForm] = useState({ title: '', description: '', achievementDate: '', image: null });
    const [editingAchievementId, setEditingAchievementId] = useState(null);

    // States for monthly plan image from API
    const [currentMonthlyImage, setCurrentMonthlyImage] = useState(null);
    const [monthlyPlanForm, setMonthlyPlanForm] = useState({ image: null });
    const [monthlyPreview, setMonthlyPreview] = useState(null);

    // States for calendar image from API
    const [currentCalendarImage, setCurrentCalendarImage] = useState(null);
    const [calendarForm, setCalendarForm] = useState({ image: null });
    const [calendarPreview, setCalendarPreview] = useState(null);

    //status for add extansions in communication
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const fileInputRef = useRef(null);

    //status for add email list in communication
    const [uploadedEmailFile, setUploadedEmailFile] = useState(null);
    const [uploadEmailStatus, setUploadEmailStatus] = useState('');
    const emailInputRef = useRef(null);
    const [currentEmailFile, setCurrentEmailFile] = useState(null);


    //status for add QMS document in policies
    const [qmsFiles, setQmsFiles] = useState([]);
    const [qmsUploadedFiles, setQmsUploadedFiles] = useState([]);
    const [uploadQmsStatus, setUploadQmsStatus] = useState('');
    const qmsInputRef = useRef(null);

    //status for add EMS documents in policies
    const [emsFiles, setEmsFiles] = useState([]);
    const [emsUploadedFiles, setEmsUploadedFiles] = useState([]);
    const [uploadEmsStatus, setUploadEmsStatus] = useState('');
    const emsInputRef = useRef(null);

   

    // Check login state on mount
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token === 'admin-token-123') {
            setIsLoggedIn(true);
        }
    }, []);

    // Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                setSuccessMessage('Login Successful!'); // Set success message
                setUsername('');
                setPassword('');
                // Clear message and set logged-in state after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                    setIsLoggedIn(true);
                }, 3000);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your connection.');
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
        navigate('/');  // Navigate to home page after logout
    };

    //Function to handle cancel
    const handleCancel = () => {
        setUsername('');
        setPassword('');
    }

    // Function to fetch carousel images from the backend
    const fetchCarouselImages = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/carousel');
            const data = await response.json();
            const imagesWithId = data.map((image, index) => ({
                Id: index + 1,
                Title: image.Title || `Image ${index + 1}`,
                ImagePath: image.ImagePath
            }));
            setCarouselImages(imagesWithId);
        } catch (error) {
            console.error('Error fetching carousel images:', error);
        }
    };

    // Functions to fetch news data from the backend
    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/news');
            if (!response.ok) {
                throw new Error("Network error");
            }
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    // Function to fetch calendar events data from backend
    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/calendar');
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching calendar events:', error);
            alert('Failed to fetch events. Please check the server connection.');
        }
    };

    // Function to fetch achievement data from backend
    const fetchAchievements = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/achievements');
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            setAchievements(data);
        } catch (error) {
            console.error('Error fetching achievements data:', error);
            alert('Failed to fetch achievements data. Please check the server connection.');
        }
    };

    // Function to fetch monthly plan image from backend
    const fetchMonthlyPlan = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/monthly-plan');
            if (!response.ok) {
                throw new Error('Failed to fetch monthly plan image');
            }
            const data = await response.json();
            setCurrentMonthlyImage(data.imagePath);
        } catch (error) {
            console.error('Error fetching monthly plan image:', error);
            setCurrentMonthlyImage(null);
        }
    };

    // Function to fetch calendar image from backend
    const fetchCalendarImage = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/calendar-image');
            if (!response.ok) {
                throw new Error('Failed to fetch calendar image');
            }
            const data = await response.json();
            setCurrentCalendarImage(data.imagePath);
        } catch (error) {
            console.error('Error fetching calendar image:', error);
            setCurrentMonthlyImage(null);
        }
    };

    //Function to fetch email list
    const fetchEmailList = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/emailList');
            if (!response.ok) {
            throw new Error('Failed to fetch email list');
            }
            const data = await response.json();
            setCurrentEmailFile(data.emailPath);
        } catch (error) {
            console.error('Error fetching email list:', error);
            setCurrentEmailFile(null);
        }
        };


    // Function to fetch QMS files
    const fetchQmsFiles = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/qms');
            if (!response.ok) {
                throw new Error('Failed to fetch QMS files');
            }
            const data = await response.json();
            setQmsUploadedFiles(data.files || []);
        } catch (error) {
            console.error('Error fetching QMS files:', error);
            setQmsUploadedFiles([]);
        }
    };

    //Function to fetch EMS files
    const fetchEmsFiles = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/ems');
            if (!response.ok) {
                throw new Error('Failed to fetch EMS files');
            }
            const data = await response.json();
            setEmsUploadedFiles(data.files || []);
        }
        catch (error) {
            console.error('Error fetching EMS files:', error);
            setEmsUploadedFiles([]);
        }
    };

    // Fetch active tab data whenever it changes
    useEffect(() => {
        if (activeTab === 'carousel') {
            fetchCarouselImages();
        } else if (activeTab === 'news') {
            fetchNews();
        } else if (activeTab === 'calendar') {
            fetchEvents();
            fetchMonthlyPlan();
            fetchCalendarImage();
        } else if (activeTab === 'achievements') {
            fetchAchievements();
        } else if (activeTab === 'policies') {
            fetchQmsFiles();
            fetchEmsFiles();
        } else if (activeTab === 'communication') {
            fetchEmailList();
        }
    }, [activeTab]);

    ////////======/functions in carousel images/========///////////
    // Handle form input changes in carousel images
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setCarouselForm({ ...carouselForm, image: file });
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setCarouselForm({ ...carouselForm, [name]: value });
        }
    };

    //form submission
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', carouselForm.title);
        formData.append('image', carouselForm.image);

        try {
            const response = await fetch('http://localhost:3001/api/carousel', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                alert('Image uploaded successfully!');
                setCarouselForm({ title: '', image: null });
                setPreviewImage(null);
                fetchCarouselImages();
            } else {
                alert(`Error: ${data.error || 'Failed to upload image'}`);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please check the server connection or file type.');
        }
    };

    //handle deletion
    const handleDeleteCarousel = async (imageId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this image?");
        if (isConfirmed) {
            try {
                const image = carouselImages.find(img => img.Id === imageId);
                const filename = image.ImagePath.split('/').pop();
                const response = await fetch(`http://localhost:3001/api/carousel/${filename}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Image deleted successfully!');
                    fetchCarouselImages();
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Delete failed:', error);
                alert('Delete failed. Please check the server connection.');
            }
        }
    };

    //////==========/functions in news==============////
    //form submission
    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editingId) {
                response = await fetch(`http://localhost:3001/api/news/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content }),
                });
                if (response.ok) {
                    setEditingId(null);
                }
            } else {
                response = await fetch('http://localhost:3001/api/news', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content }),
                });
            }
            if (response.ok) {
                setTitle('');
                setContent('');
                fetchNews();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
                console.error('Server error:', errorData.error);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Failed to connect to the server. Please check the network connection.');
        }
    };

    //handle deletion
    const handleDeleteNews = async (id) => {
        try {
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                alert('Invalid news item ID');
                console.error('Invalid ID received:', id);
                return;
            }

            console.log('Attempting to delete news item with ID:', parsedId);
            const response = await fetch(`http://localhost:3001/api/news/${parsedId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('News item deleted successfully!');
                fetchNews();
            } else {
                const errorData = await response.json();
                alert(`Error deleting news: ${errorData.error}`);
                console.error('Server error:', errorData.error);
            }
        } catch (error) {
            console.error('Error deleting news:', error.message, error.stack);
            alert('Failed to delete news. Check server connection.');
        }
    };

    //handle edit
    const handleEdit = (item) => {
        setTitle(item.Title);
        setContent(item.Content);
        setEditingId(item.Id);
    };

    ///////================Calendar events functions===================///////////
    // Handle form input changes in events
    const handleEventInputChange = (e) => {
        const { name, value } = e.target;
        setEventForm({ ...eventForm, [name]: value });
    };

    // Form submission
    const handleEventSubmit = async (e) => {
        e.preventDefault();
        const { title, description, eventDate } = eventForm;

        if (!title || !description || !eventDate) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const url = editingId
                ? `http://localhost:3001/api/calendar/${editingId}`
                : 'http://localhost:3001/api/calendar';
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, eventDate }),
            });

            if (response.ok) {
                alert(editingId ? 'Event updated successfully!' : 'Event added successfully!');
                setEventForm({ title: '', description: '', eventDate: '' });
                setEditingId(null);
                fetchEvents();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error submitting event:', error);
            alert('Failed to submit event. Please check the server connection.');
        }
    };

    // Handle event deletion
    const handleDeleteEvent = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this event?');
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3001/api/calendar/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Event deleted successfully!');
                    fetchEvents();
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('Failed to delete event. Please check the server connection.');
            }
        }
    };

    // Handle event editing
    const handleEditEvent = (event) => {
        setEventForm({
            title: event.Title,
            description: event.Description,
            eventDate: event.EventDate.split('T')[0],
        });
        setEditingId(event.Id);
    };

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter events based on search query
    const filteredEvents = events.filter(event =>
        event.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.Description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    ////////=======functions in monthly plan image========///////////
    // Handle form input changes in monthly plan
    const handleMonthlyChange = (e) => {
        const file = e.target.files[0];
        setMonthlyPlanForm({ image: file });
        setMonthlyPreview(file ? URL.createObjectURL(file) : null);
    };

    // Handle monthly plan image upload
    const handleUploadMonthly = async (e) => {
        e.preventDefault();
        if (!monthlyPlanForm.image) {
            alert('Please select an image to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('image', monthlyPlanForm.image);
        try {
            const response = await fetch('http://localhost:3001/api/monthly-plan', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log('Upload response:', data);
            if (response.ok) {
                alert('Monthly plan image uploaded successfully!');
                setMonthlyPlanForm({ image: null });
                setMonthlyPreview(null);
                setCurrentMonthlyImage(data.imagePath);
            } else {
                alert(`Error: ${data.error || 'Failed to upload monthly plan image'}`);
            }
        } catch (error) {
            console.error('Error uploading monthly plan image:', error);
            alert('Upload failed. Please check the server connection or file type.');
        }
    };

    //////////==========functions in calendar image========///////////
    // Handle form input changes in calendar image
    const handleCalendarChange = (e) => {
        const file = e.target.files[0];
        setCalendarForm({ image: file });
        setCalendarPreview(file ? URL.createObjectURL(file) : null);
    };

    // Handle calendar image upload
    const handleUploadCalendar = async (e) => {
        e.preventDefault();
        if (!calendarForm.image) {
            alert('Please select an image to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('image', calendarForm.image);
        try {
            const response = await fetch('http://localhost:3001/api/calendar-image', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log('Upload response:', data);
            if (response.ok) {
                alert('Calendar image uploaded successfully!');
                setCalendarForm({ image: null });
                setCalendarPreview(null);
                setCurrentCalendarImage(data.imagePath);
            } else {
                alert(`Error: ${data.error || 'Failed to upload calendar image'}`);
            }
        } catch (error) {
            console.error('Error uploading calendar image:', error);
            alert('Upload failed. Please check the server connection or file type.');
        }
    };

    ///////=========functions in achievements data========/////////
    // Handle form input changes in achievements
    const handleAchievementInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setAchievementForm({ ...achievementForm, image: file });
            setPreviewImage(file ? URL.createObjectURL(file) : null);
        } else {
            setAchievementForm({ ...achievementForm, [name]: value });
        }
    };

    // Handle submit in achievements
    const handleAchievementSubmit = async (e) => {
        e.preventDefault();
        const { title, description, achievementDate, image } = achievementForm;
        if (!title || !description || !achievementDate) {
            console.log('Validation failed:', { title, description, achievementDate });
            alert('Please fill in all required fields');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('achievementDate', achievementDate);
        if (image) {
            console.log('Appending image:', image.name, image.type, image.size);
            formData.append('image', image);
        }

        console.log('Submitting achievement with data:', {
            title,
            description,
            achievementDate,
            hasImage: !!image
        });

        try {
            const url = editingAchievementId ? `http://localhost:3001/api/achievements/${editingAchievementId}` : 'http://localhost:3001/api/achievements';
            const method = editingAchievementId ? 'PUT' : 'POST';
            console.log('Sending fetch request:', { url, method });

            const response = await fetch(url, { method, body: formData });
            console.log('Fetch response:', { status: response.status, statusText: response.statusText });

            if (response.ok) {
                console.log('Achievement submitted successfully');
                alert(editingAchievementId ? 'Achievement updated successfully!' : 'Achievement added successfully!');
                setAchievementForm({ title: '', description: '', achievementDate: '', image: null });
                setPreviewImage(null);
                setEditingAchievementId(null);
                fetchAchievements();
            } else {
                const errorData = await response.json();
                console.log('Backend error response:', errorData);
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Network error submitting achievement:', {
                message: error.message,
                stack: error.stack
            });
            alert('Failed to submit achievement. Please check the server connection.');
        }
    };

    // Handle edit in achievements
    const handleEditAchievement = (achievement) => {
        setAchievementForm({
            title: achievement.Title,
            description: achievement.Description,
            achievementDate: achievement.AchievementDate.split('T')[0],
            image: null,
        });
        setPreviewImage(achievement.ImagePath ? `http://localhost:3001${achievement.ImagePath}` : null);
        setEditingAchievementId(achievement.Id);
    };

    // Handle delete in achievements
    const handleDeleteAchievement = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this achievement?');
        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3001/api/achievements/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Achievement deleted successfully!');
                    fetchAchievements();
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error deleting achievement:', error);
                alert('Failed to delete achievement. Please check the server connection.');
            }
        }
    };

    ////////========functions in add extensions/contacts in communication====//////

    // Handler for extension file selection
    const handleExtensionFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        setUploadedFile(file);
        setUploadStatus(''); // Clear error message on valid file selection
    } else {
        setUploadedFile(null);
        setUploadStatus('Please select a PDF file to upload.');
    }
    };

     const handleUploadExtension = async (e) => {
    e.preventDefault();
    if (!uploadedFile) {
        setUploadStatus('Please select a PDF file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('extensionList', uploadedFile);

    try {
        const response = await fetch('http://localhost:3001/api/extension', {
        method: 'POST',
        body: formData,
        });
        const data = await response.json();
        if (response.ok) {
        setUploadStatus('File uploaded successfully!');
        setUploadedFile(null); // Reset after success
        fileInputRef.current.value = ''; // Clear the file input
        } else {
        setUploadStatus(`Error: ${data.error || 'Failed to upload file'}`);
        }
    } catch (error) {
        console.error('Upload failed:', error);
        setUploadStatus('Upload failed. Please check the server connection.');
    }
    };

    // Handler for email list upload
    const handleEmailFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        setUploadedEmailFile(file);
        setUploadEmailStatus(''); // Clear error message on valid file selection
    } else {
        setUploadedEmailFile(null);
        setUploadEmailStatus('Please select a PDF file to upload.');
    }
    };
 
    const handleUploadEmail = async (e) => {
    e.preventDefault();
    if (!uploadedEmailFile) {
        setUploadEmailStatus('Please select a PDF file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('emails', uploadedEmailFile);

    try {
        const response = await fetch('http://localhost:3001/api/emailList', {
        method: 'POST',
        body: formData,
        });

        if (!response.ok) {
        const text = await response.text();
        console.error('Non-OK response:', response.status, response.statusText, text.substring(0, 200));
        setUploadEmailStatus(`Error: ${response.status} ${response.statusText}. Check console for details.`);
        return;
        }

        const data = await response.json();

        setUploadEmailStatus('File uploaded successfully!');
        setUploadedEmailFile(null);
        emailInputRef.current.value = ''; // Use separate ref
    } catch (error) {
        console.error('Upload failed:', error);
        setUploadEmailStatus('Upload failed. Please check the server connection.');
    }
    };


    //////////========functions in uploading QMS document in policies==//////////
    // Handler for QMS file selection
        const handleQmsFilesChange = (e) => {
            const selectedFiles = Array.from(e.target.files);
            const validFiles = selectedFiles.filter(file => 
                file.type === 'application/pdf' || 
                file.type === 'application/msword' ||
                file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                file.type === 'text/plain' ||
                file.type.startsWith('image/')
            );
            
            if (validFiles.length !== selectedFiles.length) {
                setUploadQmsStatus('Some files were skipped. Only PDF, DOC, DOCX, TXT, and image files are allowed.');
            } else {
                setUploadQmsStatus('');
            }
            
            setQmsFiles(validFiles);
        };

    // Handler for QMS upload
    const handleUploadQms = async (e) => {
        e.preventDefault();
        if (!qmsFiles || qmsFiles.length === 0) {
            setUploadQmsStatus('Please select at least one file to upload.');
            return;
        }

        const formData = new FormData();
        qmsFiles.forEach((file, index) => {
        formData.append('qmsFiles', file);  
        console.log(`Added file ${index + 1}:`, file.name, 'Field: qms');
    });

        // Log form data entries (for debugging)
        console.log('FormData entries:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1].name);
        }

        try {
            console.log('Uploading to http://localhost:3001/api/qms');
            
            const response = await fetch('http://localhost:3001/api/qms', {
                method: 'POST',
                body: formData,
            });
            
            console.log('Response status:', response.status);
            
            const responseText = await response.text();
            console.log('Response:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                throw new Error(`Server returned: ${responseText.substring(0, 200)}`);
            }
            
            if (!response.ok) {
                throw new Error(data.error || `Server error: ${response.status}`);
            }
            
            setUploadQmsStatus(`Success! ${data.message}`);
            setQmsFiles([]);
            if (qmsInputRef.current) {
                qmsInputRef.current.value = '';
            }
            fetchQmsFiles(); // Refresh the list after successful upload
            
            setTimeout(() => {
                setUploadQmsStatus('');
            }, 5000);
            
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadQmsStatus(`Upload failed: ${error.message}`);
            
            setTimeout(() => {
                setUploadQmsStatus('');
            }, 5000);
        }
    };

    // Handler for removing a selected QMS file
    const handleRemoveQmsFile = (index) => {
        setQmsFiles(prev => prev.filter((_, i) => i !== index));
        if (qmsFiles.length === 1) {
            setUploadQmsStatus('');
        }
    };

    // Handler for clearing all selected QMS files
    const handleClearQmsFiles = () => {
        setQmsFiles([]);
        setUploadQmsStatus('');
        if (qmsInputRef.current) {
            qmsInputRef.current.value = '';
        }
    };

    // Handler for deleting an uploaded QMS file
    const handleDeleteQmsFile = async (filename) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this file?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3001/api/qms/${filename}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('File deleted successfully!');
                fetchQmsFiles(); // Refresh the list
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to delete file'}`);
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete file. Please check the server connection.');
        }
    };


    //////////========functions in uploading EMS document in policies==//////////
    //Handler for EMS file selection
    const handleEmsFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => 
            file.type === 'application/pdf' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'text/plain' ||
            file.type.startsWith('image/')
        );

        if (validFiles.length !== selectedFiles.length) {
            setUploadEmsStatus('Some files were skipped. Only PDF, DOC, DOCX, TXT, and image files are allowed.');
        } else {
            setUploadEmsStatus('');
        }
        setEmsFiles(validFiles);
    };

    //Handler for EMS upload
    const handleUploadEms = async (e) => {
         e.preventDefault();
        if (!emsFiles || emsFiles.length === 0) {
            setUploadEmsStatus('Please select at least one file to upload.');
            return;
        }

        const formData = new FormData();
        emsFiles.forEach((file, index) => {
        formData.append('emsFiles', file);  
        console.log(`Added file ${index + 1}:`, file.name, 'Field: ems');
    });

        // Log form data entries (for debugging)
        console.log('FormData entries:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1].name);
        }

        try {
            console.log('Uploading to http://localhost:3001/api/ems');
            
            const response = await fetch('http://localhost:3001/api/ems', {
                method: 'POST',
                body: formData,
            });
            
            console.log('Response status:', response.status);
            
            const responseText = await response.text();
            console.log('Response:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                throw new Error(`Server returned: ${responseText.substring(0, 200)}`);
            }
            
            if (!response.ok) {
                throw new Error(data.error || `Server error: ${response.status}`);
            }
            
            setUploadEmsStatus(`Success! ${data.message}`);
            setEmsFiles([]);
            if (emsInputRef.current) {
                emsInputRef.current.value = '';
            }
            fetchEmsFiles(); // Refresh the list after successful upload
            
            setTimeout(() => {
                setUploadEmsStatus('');
            }, 5000);
            
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadEmsStatus(`Upload failed: ${error.message}`);
            
            setTimeout(() => {
                setUploadEmsStatus('');
            }, 5000);
        }
    };

    //Handler for removing a selected EMS file
    const handleRemoveEmsFile = (index) => {
        setEmsFiles(prev => prev.filter((_, i) => i !== index));
        if (emsFiles.length === 1) {
            setUploadEmsStatus('');
        }
    };

    //Handler for clearing EMS files
    const handleClearEmsFiles = () => {
        setEmsFiles([]);
        setUploadEmsStatus('');
        if (emsInputRef.current) {
            emsInputRef.current.value = '';
        }
    };

    //Handler for deleting EMS files
    const handleDeleteEmsFiles = async (filename) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this file?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3001/api/ems/${filename}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('File deleted successfully!');
                fetchEmsFiles(); // Refresh the list
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to delete file'}`);
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete file. Please check the server connection.');
        }
    }


    const applications = [
        { id: 'hr', name: 'Human Resource Management', icon: <FiUsers /> },
        { id: 'medical', name: 'Medical', icon: <FiFileText /> },
        { id: 'display', name: 'Display Panel', icon: <FiImage /> },
        { id: 'appraisal', name: 'Appraisal', icon: <FiFileText /> },
        { id: 'feedback', name: 'Feedback Form', icon: <FiMessageSquare /> },
        { id: 'nonconformity', name: 'Non-Conformity', icon: <FiSettings /> },
        { id: 'sfa', name: 'SFA', icon: <FiSettings /> },
        { id: 'ifs', name: 'IFS', icon: <FiSettings /> },
        { id: 'kpi', name: 'KPI', icon: <FiSettings /> },
        { id: 'wms', name: 'WMS', icon: <FiSettings /> },
        { id: 'docware', name: 'Docware', icon: <FiSettings /> },
        { id: 'production display', name: 'Production Display', icon: <FiSettings /> }
    ];

    const policies = [
        { id: 1, title: 'Standard Operating Procedures', category: 'SOP' },
        { id: 2, title: 'International Organization for Standardization', category: 'ISO' },
        { id: 3, title: 'Quality Management System', category: 'QMS' },
        { id: 4, title: 'Environmental Management System', category: 'EMS' },
        { id: 5, title: 'Health and Welfare', category: 'H&W' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            ///-------------- image carousel---------------///
            case 'carousel':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Company Image Carousel</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-blue-50 rounded-lg shadow p-6 border border-gray-200">
                                <h1 className="text-xl font-bold text-gray-800 mb-6">Add new image to the company carousel</h1>
                                <form onSubmit={handleUpload} className="bg-white rounded-lg shadow p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={carouselForm.title}
                                                onChange={handleInputChange}
                                                placeholder="Enter image title"
                                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Image</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={handleInputChange}
                                                    className="block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-blue-50 file:text-blue-700
                                                    hover:file:bg-blue-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 p-4 flex flex-col items-center justify-center h-48">
                                        {previewImage ? (
                                            <img src={previewImage} alt="Preview" className="max-h-full max-w-full object-contain" />
                                        ) : (
                                            <span className="text-gray-400 mb-2">Image preview will appear here</span>
                                        )}
                                    </div>
                                    <div className="flex justify-end space-x-4 mt-6">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
                                            disabled={!carouselForm.title || !carouselForm.image}
                                        >
                                            Upload Image
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCarouselForm({ title: '', image: null });
                                                setPreviewImage(null);
                                            }}
                                            className="px-6 py-2 bg-gray-300 text-black hover:text-white rounded-md hover:bg-gray-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 p-4'>
                            <h1 className='font-bold'>Manage existing images</h1>
                            <table className="w-full bg-black border-1 border-black rounded-lg overflow-hidden">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-black">
                                    {carouselImages.length > 0 ? (
                                        carouselImages.map((image) => (
                                            <tr key={image.Id} className='text-center'>
                                                <td className="px-4 py-4 justify-center items-center whitespace-nowrap text-sm font-medium text-black">
                                                    {image.Title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap align-middle">
                                                    <div className="h-20 w-20 border mx-auto">
                                                        <img
                                                            src={`http://localhost:3001${image.ImagePath}`}
                                                            alt={image.Title}
                                                            className="h-full w-full object-cover rounded-md"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className='flex justify-center space-x-2'>
                                                        <button
                                                            onClick={() => handleDeleteCarousel(image.Id)}
                                                            className="text-red-600 hover:text-red-900 border-1 rounded px-3"
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="text-gray-400 hover:text-black border-1 rounded px-3"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-gray-500">
                                                No images found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            ///----------------------- news and announcements -------------------------------------///
            case 'news':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">News & Announcements</h2>
                        <div className="bg-white rounded-lg shadow p-6 mt-6">
                            <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit News' : 'Add News & Announcements'}</h3>
                            <form onSubmit={handleAddOrUpdate} className="space-y-4">
                                <label className='font-semibold text-blue-950'>Title:</label>
                                <input
                                    type="text"
                                    placeholder="News Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <label className='font-semibold text-blue-950'>Content:</label>
                                <textarea
                                    placeholder="News Content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="w-2/4 flex space-x-3 pt-2">
                                    <button type="submit" className="px-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex-1">
                                        {editingId ? 'Update' : 'Add'}
                                    </button>
                                    <button type="button" onClick={() => {
                                        setTitle('');
                                        setContent('');
                                        setEditingId(null);
                                    }} className="px-1 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-400 transition-colors flex-1">
                                        Clear
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">Manage News & Announcements</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        className="border border-gray-300 rounded-md px-3 py-1 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <IoSearchOutline className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" fill="none" stroke="currentColor" />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-black border-1 border-black rounded-lg">
                                    <thead className="bg-gray-50">
                                        <tr className='text-center'>
                                            <th scope="col" className="px-6 py-3 font-bold text-medium text-blue-900 tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 font-bold text-medium text-blue-900 tracking-wider">Content</th>
                                            <th scope="col" className="px-6 py-3 font-bold text-medium text-blue-900 tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 font-bold text-medium text-blue-900 tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {news.length > 0 ? (
                                            news.map((item) => (
                                                <tr key={item.Id} className="text-center align-middle">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.Content}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.CreatedAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="text-blue-600 hover:text-blue-900 mr-3 border px-3 rounded"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteNews(item.Id)}
                                                            className="text-red-600 hover:text-red-900 border px-3 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                                    No news items found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            ///----------------------- calendar section -----------------------------------///
            case 'calendar':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Working Calendar</h2>
                        <div className="flex flex-col gap-6">
                            <div className="bg-blue-50 rounded-lg shadow p-6 border border-gray-200">
                                <h1 className="text-xl font-bold text-gray-800 mb-6">{editingId ? 'Edit Event' : 'Add New Event'}</h1>
                                <div className="bg-white rounded-lg shadow p-6">
                                    <form onSubmit={handleEventSubmit}>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={eventForm.title}
                                                    onChange={handleEventInputChange}
                                                    placeholder="Enter event title"
                                                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={eventForm.description}
                                                    onChange={handleEventInputChange}
                                                    placeholder="Enter event description"
                                                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Event Date</label>
                                                <input
                                                    type="date"
                                                    name="eventDate"
                                                    value={eventForm.eventDate}
                                                    onChange={handleEventInputChange}
                                                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-4 mt-6">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                disabled={!eventForm.title || !eventForm.description || !eventForm.eventDate}
                                            >
                                                {editingId ? 'Update Event' : 'Add Event'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEventForm({ title: '', description: '', eventDate: '' });
                                                    setEditingId(null);
                                                }}
                                                className="px-6 py-2 bg-gray-300 text-gray-700 hover:text-white rounded-md hover:bg-gray-700 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Monthly Plan Image Upload */}
                                <div className="bg-green-50 rounded-lg shadow p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold mb-4">Monthly Plan Image</h3>
                                    <form onSubmit={handleUploadMonthly} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Upload Monthly Plan</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleMonthlyChange}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                            />
                                        </div>
                                        {monthlyPreview && (
                                            <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                                <img src={monthlyPreview} alt="Monthly Preview" className="max-h-48 max-w-full object-contain mx-auto" />
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                            disabled={!monthlyPlanForm.image}
                                        >
                                            Upload Monthly Plan
                                        </button>
                                    </form>
                                    {currentMonthlyImage && (
                                        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                                            <p className="text-sm font-medium mb-2">Current Monthly Plan:</p>
                                            <img src={`http://localhost:3001${currentMonthlyImage}`} alt="Current Monthly" className="max-h-48 max-w-full object-contain mx-auto" />
                                        </div>
                                    )}
                                </div>

                                {/* Calendar Image Upload */}
                                <div className="bg-purple-50 rounded-lg shadow p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold mb-4">Calendar Image</h3>
                                    <form onSubmit={handleUploadCalendar} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Upload Calendar Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleCalendarChange}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                            />
                                        </div>
                                        {calendarPreview && (
                                            <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                                <img src={calendarPreview} alt="Calendar Preview" className="max-h-48 max-w-full object-contain mx-auto" />
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                                            disabled={!calendarForm.image}
                                        >
                                            Upload Calendar Image
                                        </button>
                                    </form>
                                    {currentCalendarImage && (
                                        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                                            <p className="text-sm font-medium mb-2">Current Calendar Image:</p>
                                            <img src={`http://localhost:3001${currentCalendarImage}`} alt="Current Calendar" className="max-h-48 max-w-full object-contain mx-auto" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 p-4">
                            <h1 className="text-xl font-bold text-gray-800">Manage Existing Events</h1>
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                    />
                                    <IoSearchOutline className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredEvents.length > 0 ? (
                                            filteredEvents.map((event) => (
                                                <tr key={event.Id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.Title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{event.Description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(event.EventDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => handleEditEvent(event)}
                                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteEvent(event.Id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                                    No events found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            ///------------------------- applications section -----------------------------------///
            case 'applications':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Applications</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {applications.map(app => (
                                <div
                                    key={app.id}
                                    className={`border rounded-lg p-4 flex items-center space-x-3 cursor-pointer ${activeApplication === app.id ? 'border-blue-500 bg-blue-50' : 'border-gray-400 hover:bg-gray-50'}`}
                                    onClick={() => setActiveApplication(app.id)}
                                >
                                    <div className="text-blue-600">{app.icon}</div>
                                    <div>
                                        <h3 className="font-medium">{app.name}</h3>
                                        <p className="text-sm text-gray-500">Manage {app.name.toLowerCase()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            ///----------------------- policies and procedures section ---------------------------///
            case 'policies':
                return (
                    <div className="space-y-6 w-full">
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">Policies & Procedures</h2>
                        
                        {/* QMS Quick Access */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4">Quality Management System (QMS)</h3>
                            <p className="text-gray-600 mb-4">
                                Manage all your QMS documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            <button
                                onClick={() => window.location.href = '/qms'}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Go to QMS Documents
                            </button>
                            {/* upload QMS files */}
                            <div className="mb-6 mt-4 p-4 bg-indigo-100 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2">Upload QMS Documents</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                </p>
                                <form onSubmit={handleUploadQms}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Select Files (Multiple files allowed)
                                        </label>
                                        <input
                                            type="file"
                                            ref={qmsInputRef}
                                            onChange={handleQmsFilesChange}
                                            accept=".pdf,.doc,.docx,.txt,image/*"
                                            multiple
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                                
                                {/* Selected Files List */}
                                {qmsFiles.length > 0 && (
                                    <div className="mb-4 p-3 bg-white rounded border">
                                        <h4 className="font-medium mb-2">Selected Files ({qmsFiles.length}):</h4>
                                        <ul className="space-y-1 max-h-32 overflow-y-auto">
                                            {qmsFiles.map((file, index) => (
                                                <li key={index} className="flex justify-between items-center text-sm">
                                                <span className="truncate flex-1">{file.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveQmsFile(index)}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                    Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                                
                                <div className={uploadQmsStatus.includes('Success') ? 'text-green-500' : 'text-red-500'}>{uploadQmsStatus}</div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                                            disabled={qmsFiles.length === 0}
                                        >
                                            Upload {qmsFiles.length > 0 ? `(${qmsFiles.length})` : ''} Files
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClearQmsFiles}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </form>

                                {/* Uploaded Files List */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4">Uploaded QMS Documents ({qmsUploadedFiles.length})</h3>
                                    {qmsUploadedFiles.length > 0 ? (
                                        <div className="space-y-3">
                                            {qmsUploadedFiles.map((file) => (
                                                <div key={file.filename} className="flex justify-between items-center p-3 bg-white rounded border">
                                                    <div className="flex-1">
                                                        <p className="font-medium truncate">{file.filename}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                <div className="flex space-x-2">
                                                    <a
                                                         href={`http://localhost:3001${file.filePath}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                                    >
                                                        Download
                                                    </a>
                                                    <button
                                                        onClick={() => handleDeleteQmsFile(file.filename)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No QMS documents uploaded yet.</p>
                                    )}
                            </div>
                        </div>
                        </div>


                        {/* EMS Quick Access */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4">Environmental Management System (QMS)</h3>
                            <p className="text-gray-600 mb-4">
                                Manage all your EMS documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            <button
                                onClick={() => window.location.href = '/ems'}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Go to EMS Documents
                            </button>
                            {/* file uload section - EMS */}
                            <div className="mb-6 mt-4 p-4 bg-indigo-100 rounded-lg shadow">
                                <h2 className="text-xl font-semibold mb-2">Upload EMS Documents</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                </p>
                                <form 
                                    onSubmit={handleUploadEms}
                                >
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Select Files (Multiple files allowed)
                                    </label>
                                    <input
                                        type="file"
                                        ref={emsInputRef}
                                        onChange={handleEmsFileChange}
                                        accept=".pdf,.doc,.docx,.txt,image/*"
                                        multiple
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                                                
                                {/* Selected Files List */}
                                {emsFiles.length > 0 && (
                                    <div className="mb-4 p-3 bg-white rounded border">
                                        <h4 className="font-medium mb-2">Selected Files ({emsFiles.length}):</h4>
                                        <ul className="space-y-1 max-h-32 overflow-y-auto">
                                            {emsFiles.map((file, index) => (
                                                <li key={index} className="flex justify-between items-center text-sm">
                                                    <span className="truncate flex-1">{file.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveEmsFile(index)}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                                
                                <div className={uploadEmsStatus.includes('Success') ? 'text-green-500' : 'text-red-500'}>{uploadEmsStatus}</div>
                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                                        disabled={emsFiles.length === 0}
                                    >
                                        Upload {emsFiles.length > 0 ? `(${emsFiles.length})` : ''} Files
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClearEmsFiles}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                </form>

                                {/* Uploaded Files List */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4">Uploaded Ems Documents ({emsUploadedFiles.length})</h3>
                                        {emsUploadedFiles.length > 0 ? (
                                        <div className="space-y-3">
                                            {emsUploadedFiles.map((file) => (
                                            <div key={file.filename} className="flex justify-between items-center p-3 bg-white rounded border">
                                                <div className="flex-1">
                                                    <p className="font-medium truncate">{file.filename}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <a
                                                        href={`http://localhost:3001${file.filePath}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                                    >
                                                        Download
                                                    </a>
                                                    <button
                                                        onClick={() => handleDeleteEmsFiles(file.filename)}
                                                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                <p className="text-gray-500 text-center py-4">No EMS documents uploaded yet.</p>
                                )}
                                </div>
                            </div>
                        </div>


                        {/* SOP Quick Access */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4">Standard Operating Procedures (SOP)</h3>
                            <p className="text-gray-600 mb-4">
                                Manage all your SOP documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            <button
                                onClick={() => window.location.href = '#'}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Go to SOP Documents
                            </button>
                            {/* file uload section - SOP */}
                             <div className="mb-6 mt-4 p-4 bg-indigo-100 rounded-lg shadow">
                                <h2 className="text-xl font-semibold mb-2">Upload SOP Documents</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                </p>
                                <form 
                                // onSubmit={handleUploadQms}
                                >
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Select Files (Multiple files allowed)
                                    </label>
                                    <input
                                        type="file"
                                        // ref={qmsInputRef}
                                        // onChange={handleQmsFilesChange}
                                        accept=".pdf,.doc,.docx,.txt,image/*"
                                        multiple
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                                                
                                {/* Selected Files List */}
                                {qmsFiles.length > 0 && (
                                    <div className="mb-4 p-3 bg-white rounded border">
                                        <h4 className="font-medium mb-2">Selected Files ({qmsFiles.length}):</h4>
                                        <ul className="space-y-1 max-h-32 overflow-y-auto">
                                            {qmsFiles.map((file, index) => (
                                                <li key={index} className="flex justify-between items-center text-sm">
                                                    <span className="truncate flex-1">{file.name}</span>
                                                    <button
                                                        type="button"
                                                        // onClick={() => handleRemoveQmsFile(index)}
                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                                
                                <div className={uploadQmsStatus.includes('Success') ? 'text-green-500' : 'text-red-500'}>{uploadQmsStatus}</div>
                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                                        disabled={qmsFiles.length === 0}
                                    >
                                        Upload {qmsFiles.length > 0 ? `(${qmsFiles.length})` : ''} Files
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClearQmsFiles}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                </form>

                                {/* Uploaded Files List */}
                                {/* <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4">Uploaded QMS Documents ({qmsUploadedFiles.length})</h3>
                                        {qmsUploadedFiles.length > 0 ? (
                                        <div className="space-y-3">
                                            {qmsUploadedFiles.map((file) => (
                                                <div key={file.filename} className="flex justify-between items-center p-3 bg-white rounded border">
                                                    <div className="flex-1">
                                                        <p className="font-medium truncate">{file.filename}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <a
                                                            href={`http://localhost:3001${file.filePath}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                                        >
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteQmsFile(file.filename)}
                                                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        ) : (
                                            <p className="text-gray-500 text-center py-4">No QMS documents uploaded yet.</p>
                                        )}
                                    </div> */}
                                </div>
                        </div>


                        {/* ISO Quick Access */}
                         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4">International Organization for Standardization (ISO)</h3>
                            <p className="text-gray-600 mb-4">
                                Manage all your ISO documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            <button
                                onClick={() => window.location.href = '#'}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Go to ISO Documents
                            </button>
                            {/* file uload section - ISO */}
                            <div className="mb-6 mt-4 p-4 bg-indigo-100 rounded-lg shadow">
                                            <h2 className="text-xl font-semibold mb-2">Upload ISO Documents</h2>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                            </p>
                                            <form 
                                            // onSubmit={handleUploadQms}
                                            >
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Select Files (Multiple files allowed)
                                                    </label>
                                                    <input
                                                        type="file"
                                                        // ref={qmsInputRef}
                                                        // onChange={handleQmsFilesChange}
                                                        accept=".pdf,.doc,.docx,.txt,image/*"
                                                        multiple
                                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                    />
                                                </div>
                                                
                                                {/* Selected Files List */}
                                                {qmsFiles.length > 0 && (
                                                    <div className="mb-4 p-3 bg-white rounded border">
                                                        <h4 className="font-medium mb-2">Selected Files ({qmsFiles.length}):</h4>
                                                        <ul className="space-y-1 max-h-32 overflow-y-auto">
                                                            {qmsFiles.map((file, index) => (
                                                                <li key={index} className="flex justify-between items-center text-sm">
                                                                    <span className="truncate flex-1">{file.name}</span>
                                                                    <button
                                                                        type="button"
                                                                        // onClick={() => handleRemoveQmsFile(index)}
                                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                
                                                <div className={uploadQmsStatus.includes('Success') ? 'text-green-500' : 'text-red-500'}>{uploadQmsStatus}</div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                                                        disabled={qmsFiles.length === 0}
                                                    >
                                                        Upload {qmsFiles.length > 0 ? `(${qmsFiles.length})` : ''} Files
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleClearQmsFiles}
                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                                    >
                                                        Clear All
                                                    </button>
                                                </div>
                                            </form>

                                            {/* Uploaded Files List */}
                                            {/* <div className="mt-8">
                                                <h3 className="text-lg font-semibold mb-4">Uploaded QMS Documents ({qmsUploadedFiles.length})</h3>
                                                {qmsUploadedFiles.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {qmsUploadedFiles.map((file) => (
                                                            <div key={file.filename} className="flex justify-between items-center p-3 bg-white rounded border">
                                                                <div className="flex-1">
                                                                    <p className="font-medium truncate">{file.filename}</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <a
                                                                        href={`http://localhost:3001${file.filePath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                                                    >
                                                                        Download
                                                                    </a>
                                                                    <button
                                                                        onClick={() => handleDeleteQmsFile(file.filename)}
                                                                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 text-center py-4">No QMS documents uploaded yet.</p>
                                                )}
                                            </div> */}
                                        </div>
                        </div>


                        {/* H&W Quick Access */}
                         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4">Health & Welfare</h3>
                            <p className="text-gray-600 mb-4">
                                Manage all your H&W documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            <button
                                onClick={() => window.location.href = '#'}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Go to H&W Documents
                            </button>
                            {/* file uload section - H&W */}
                            <div className="mb-6 mt-4 p-4 bg-indigo-100 rounded-lg shadow">
                                            <h2 className="text-xl font-semibold mb-2">Upload Health & Welfare Documents</h2>
                                            <p className="text-sm text-gray-600 mb-4">
                                                Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                            </p>
                                            <form 
                                            // onSubmit={handleUploadQms}
                                            >
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Select Files (Multiple files allowed)
                                                    </label>
                                                    <input
                                                        type="file"
                                                        // ref={qmsInputRef}
                                                        // onChange={handleQmsFilesChange}
                                                        accept=".pdf,.doc,.docx,.txt,image/*"
                                                        multiple
                                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                    />
                                                </div>
                                                
                                                {/* Selected Files List */}
                                                {qmsFiles.length > 0 && (
                                                    <div className="mb-4 p-3 bg-white rounded border">
                                                        <h4 className="font-medium mb-2">Selected Files ({qmsFiles.length}):</h4>
                                                        <ul className="space-y-1 max-h-32 overflow-y-auto">
                                                            {qmsFiles.map((file, index) => (
                                                                <li key={index} className="flex justify-between items-center text-sm">
                                                                    <span className="truncate flex-1">{file.name}</span>
                                                                    <button
                                                                        type="button"
                                                                        // onClick={() => handleRemoveQmsFile(index)}
                                                                        className="ml-2 text-red-500 hover:text-red-700"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                
                                                <div className={uploadQmsStatus.includes('Success') ? 'text-green-500' : 'text-red-500'}>{uploadQmsStatus}</div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                                                        disabled={qmsFiles.length === 0}
                                                    >
                                                        Upload {qmsFiles.length > 0 ? `(${qmsFiles.length})` : ''} Files
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleClearQmsFiles}
                                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                                    >
                                                        Clear All
                                                    </button>
                                                </div>
                                            </form>

                                            {/* Uploaded Files List */}
                                            {/* <div className="mt-8">
                                                <h3 className="text-lg font-semibold mb-4">Uploaded QMS Documents ({qmsUploadedFiles.length})</h3>
                                                {qmsUploadedFiles.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {qmsUploadedFiles.map((file) => (
                                                            <div key={file.filename} className="flex justify-between items-center p-3 bg-white rounded border">
                                                                <div className="flex-1">
                                                                    <p className="font-medium truncate">{file.filename}</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <a
                                                                        href={`http://localhost:3001${file.filePath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                                                    >
                                                                        Download
                                                                    </a>
                                                                    <button
                                                                        onClick={() => handleDeleteQmsFile(file.filename)}
                                                                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 text-center py-4">No QMS documents uploaded yet.</p>
                                                )}
                                            </div> */}
                                        </div>
                        </div>





                        {/* <div className="space-y-4">
                            {policies.map(policy => (
                                <div
                                    key={policy.id}
                                    className="border rounded-lg p-4 hover:bg-blue-50 transition-colors"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg">{policy.title}</h3>
                                            <span className="text-sm text-gray-500">{policy.category}</span>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                );

            ///----------------------- manage communication section -------------------------------///
            case 'communication':
                return (
                    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black mb-8 text-center">
                                Communication
                            </h2>
                            <div className="flex flex-col gap-6">
                                <div className="border rounded-lg p-6 bg-green-100 shadow-lg">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-900">
                                        <FiMail className="mr-2 h-5 w-5 text-blue-600" /> Email Management
                                    </h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => navigate('#')}
                                            className="w-full text-left px-4 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3"
                                        >
                                            Send Bulk Email
                                        </button>
                                        <button
                                            onClick={() => navigate('#')}
                                            className="w-full text-left px-4 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3"
                                        >
                                            Email Templates
                                        </button>
                                        <button
                                            onClick={() => navigate('#')}
                                            className="w-full text-left px-4 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-3"
                                        >
                                            Subscriber List
                                        </button>
                                    </div>
                                </div>
                               {/* Extension Upload Section */}
                                <div className="mb-6 p-4 bg-indigo-100 rounded-lg shadow">
                                    <h2 className="text-xl font-semibold mb-2">Upload Extension List</h2>
                                    <form onSubmit={handleUploadExtension}>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700">
                                        Select PDF File
                                        </label>
                                        <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleExtensionFileChange}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    <div className="text-red-500 text-sm mb-4">{uploadStatus}</div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                        disabled={!uploadedFile}
                                    >
                                        Upload PDF
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                        setUploadedFile(null);
                                        setUploadStatus('');
                                        fileInputRef.current.value = '';
                                        }}
                                        className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    </form>
                                </div>

                                {/* Email List Upload Section */}
                                <div className="mb-6 p-4 bg-fuchsia-100 rounded-lg shadow">
                                    <h2 className="text-xl font-semibold mb-2">Upload Email List</h2>
                                    <form onSubmit={handleUploadEmail}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                        Select PDF File
                                        </label>
                                        <input
                                        type="file"
                                        ref={emailInputRef}
                                        onChange={handleEmailFileChange}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    <div className="text-red-500 text-sm mb-4">{uploadEmailStatus}</div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                        disabled={!uploadedEmailFile}
                                    >
                                        Upload PDF
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                        setUploadedEmailFile(null);
                                        setUploadEmailStatus('');
                                        emailInputRef.current.value = '';
                                        }}
                                        className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    </form>
                                </div>
                                
                                {/* Current Email List Display */}
                                {currentEmailFile && (
                                    <div className="mt-6 p-4 bg-white rounded-lg shadow border">
                                    <h3 className="text-lg font-semibold mb-2">Current Email List</h3>
                                    <div className="flex justify-between items-center">
                                        <a
                                        href={`http://localhost:3001${currentEmailFile}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline flex-1 truncate"
                                        title={currentEmailFile.split('/').pop()}
                                        >
                                        📄 {currentEmailFile.split('/').pop()}
                                        </a>
                                        {/* <button
                                        onClick={handleDeleteEmail}
                                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                                        >
                                        Delete
                                        </button> */}
                                    </div>
                                    </div>
                                )}
                                </div>

                                </div>
                            </div>
                );


            ///----------------------- manage achievements page -----------------------------------///
            case 'achievements':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-blue-50 rounded-lg shadow p-6 border border-gray-200">
                                <h1 className="text-xl font-bold text-gray-800 mb-6">{editingAchievementId ? 'Edit Achievement' : 'Add new achievements to showcase company\'s outcomes'}</h1>
                                <div className="bg-white rounded-lg shadow p-6">
                                    <form onSubmit={handleAchievementSubmit}>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                                    <input type="text" name="title" value={achievementForm.title} onChange={handleAchievementInputChange} placeholder="Enter achievement title" className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea name="description" value={achievementForm.description} onChange={handleAchievementInputChange} placeholder="Enter description of achievement" className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                                    <input type="date" name="achievementDate" value={achievementForm.achievementDate} onChange={handleAchievementInputChange} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">Image (Optional)</label>
                                                    <input type="file" name="image" accept="image/*" onChange={handleAchievementInputChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                                                <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center h-full min-h-[200px]">
                                                    {previewImage ? (
                                                        <img src={previewImage} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
                                                    ) : (
                                                        <span className="text-gray-400 mb-2">Image preview will appear here</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-4 mt-6">
                                            <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors" disabled={!achievementForm.title || !achievementForm.description || !achievementForm.achievementDate}>{editingAchievementId ? 'Update Achievement' : 'Save Achievement'}</button>
                                            <button type="button" onClick={() => { setAchievementForm({ title: '', description: '', achievementDate: '', image: null }); setPreviewImage(null); setEditingAchievementId(null); }} className="px-6 py-2 bg-gray-300 text-gray-700 hover:text-white rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 p-4">
                            <h1 className="text-xl font-bold text-gray-800">Manage existing achievements</h1>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-black border-1 border-black rounded-lg overflow-hidden">
                                    <thead className="bg-gray-200">
                                        <tr className="text-center">
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {achievements.length > 0 ? (
                                            achievements.map((achievement) => (
                                                <tr key={achievement.Id} className="text-center align-middle">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{achievement.Title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{achievement.Description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(achievement.AchievementDate).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {achievement.ImagePath ? (
                                                            <img src={`http://localhost:3001${achievement.ImagePath}`} alt={achievement.Title} className="h-15 w-15 object-cover rounded-md mx-auto" />
                                                        ) : (
                                                            <div className="h-15 w-15 bg-gray-200 rounded-md mx-auto"></div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button onClick={() => handleEditAchievement(achievement)} className="text-blue-600 hover:text-blue-900 mr-3 border px-3">Edit</button>
                                                        <button onClick={() => handleDeleteAchievement(achievement.Id)} className="text-red-600 hover:text-red-900 border px-2">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="5" className="text-center py-4 text-gray-500">No achievements found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a category from the left menu</div>;
        }
    };

    // Render success message if present
    if (successMessage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
                            {successMessage}
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 font-medium">
                            Redirecting to admin panel...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Render login portal if not logged in
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            DSI Admin Portal
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 font-medium">
                            Securely access your admin dashboard
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="space-y-4">
                            <div className="relative">
                                <label>Username</label>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 hover:border-gray-300"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <label>Password</label>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 hover:border-gray-300"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="group relative flex-1 justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FiLock className="h-5 w-5 text-blue-200 group-hover:text-blue-100" />
                                </span>
                                Sign In
                            </button>
                            <button
                                type="reset"
                                onClick={handleCancel}
                                className="group relative flex-1 justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <MdOutlineCancel className="h-5 w-5 text-blue-200 group-hover:text-blue-100" />
                                </span>
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div className="text-center text-sm text-gray-500">
                        <p>DSI Samson Rubber Industries © {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Render admin panel
    return (
        <div className="flex flex-col h-screen bg-gray-400">
            <Navbar />
            <div className="flex flex-1 overflow-hidden pt-13">
                <div className="w-80 bg-blue-100 text-black p-4 overflow-y-auto">
                    <h1 className="text-3xl text-center font-bold mb-8">DSI Admin Panel</h1>
                    <nav className="space-y-4 text-lg">
                        <button
                            onClick={() => setActiveTab('carousel')}
                            className={`w-full text-left px-4 py-3 border bg-amber-200 rounded flex items-center space-x-3 ${activeTab === 'carousel' ? 'bg-amber-200' : 'hover:bg-amber-300 '}`}
                        >
                            <FiImage />
                            <span>Image Carousel</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('news')}
                            className={`w-full text-left px-4 py-3 border bg-emerald-200 rounded flex items-center space-x-3 ${activeTab === 'news' ? 'bg-emerald-200' : 'hover:bg-emerald-300'}`}
                        >
                            <FaNewspaper />
                            <span>News & Announcements</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('calendar')}
                            className={`w-full text-left px-4 py-3 border bg-fuchsia-200 rounded flex items-center space-x-3 ${activeTab === 'calendar' ? 'bg-fuchsia-200' : 'hover:bg-fuchsia-300'}`}
                        >
                            <FiCalendar />
                            <span>Working Calendar</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`w-full text-left px-4 py-3 border bg-green-200 rounded flex items-center space-x-3 ${activeTab === 'applications' ? 'bg-green-200' : 'hover:bg-green-300'}`}
                        >
                            <FiSettings />
                            <span>Applications</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('policies')}
                            className={`w-full text-left px-4 py-3 border bg-purple-200 rounded flex items-center space-x-3 ${activeTab === 'policies' ? 'bg-purple-200' : 'hover:bg-purple-300'}`}
                        >
                            <FiFileText />
                            <span>Policies & Procedures</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('communication')}
                            className={`w-full text-left px-4 py-3 border bg-sky-200 rounded flex items-center space-x-3 ${activeTab === 'communication' ? 'bg-sky-200' : 'hover:bg-sky-300'}`}
                        >
                            <FiMail />
                            <span>Communication</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={`w-full text-left px-4 py-3 border bg-blue-200 rounded flex items-center space-x-3 ${activeTab === 'achievements' ? 'bg-blue-200' : 'hover:bg-blue-300'}`}
                        >
                            <FiAward />
                            <span>Achievements</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 border bg-gray-200 rounded flex items-center space-x-3 hover:bg-gray-500 text-black hover:text-white transition-colors"
                        >
                            <TbLogout />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="bg-gray-100 rounded-lg shadow p-6 min-h-full">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <footer className='bg-blue-950 text-white py-4 text-center relative z-10'>
                <p className='text-sm'>
                    {COPYRIGHT_TEXT} {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
};

export default Admin;