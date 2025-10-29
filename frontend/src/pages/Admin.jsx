import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiCalendar, FiImage, FiFileText, FiUsers, FiSettings, FiAward, FiMessageSquare, FiUser, FiLock, FiUpload, FiX } from 'react-icons/fi';
import { TbLogout } from "react-icons/tb";
import Navbar from '../components/Navbar';
import { FaNewspaper } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

const COPYRIGHT_TEXT = `All rights reserved © DSI Samson Rubber Industries - Information Technology Department`;

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('carousel');
    // const [activeApplication, setActiveApplication] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    // Status for add extensions in communication
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const fileInputRef = useRef(null);

    // Status for add email list in communication
    const [uploadedEmailFile, setUploadedEmailFile] = useState(null);
    const [uploadEmailStatus, setUploadEmailStatus] = useState('');
    const emailInputRef = useRef(null);
    const [currentEmailFile, setCurrentEmailFile] = useState(null);

    // Status for add QMS document in policies
    const [qmsFiles, setQmsFiles] = useState([]);
    const [qmsUploadedFiles, setQmsUploadedFiles] = useState([]);
    const [uploadQmsStatus, setUploadQmsStatus] = useState('');
    const qmsInputRef = useRef(null);

    // Status for add EMS documents in policies
    const [emsFiles, setEmsFiles] = useState([]);
    const [emsUploadedFiles, setEmsUploadedFiles] = useState([]);
    const [uploadEmsStatus, setUploadEmsStatus] = useState('');
    const emsInputRef = useRef(null);
   
    // Status for add H&W documents in policies
    const [hwFiles, setHwFiles] = useState([]);
    const [hwUploadedFiles, setHwUploadedFiles] = useState([]);
    const [uploadHwStatus, setUploadHwStatus] = useState('');
    const hwInputRef = useRef(null);

    // Status for add SOP documents in policies
    const [sopFiles, setSopFiles] = useState([]);
    const [sopUploadedFiles, setSopUploadedFiles] = useState([]);
    const [uploadSopStatus, setUploadSopStatus] = useState('');
    const sopInputRef = useRef(null);

    // Status for add ISO documents in policies
    const [isoFiles, setIsoFiles] = useState([]);
    const [isoUploadedFiles, setIsoUploadedFiles] = useState([]);
    const [uploadIsoStatus, setUploadIsoStatus] = useState('');
    const isoInputRef = useRef(null);

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
                setSuccessMessage('Login Successful!');
                setUsername('');
                setPassword('');
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
        navigate('/');
    };

    // Function to handle cancel
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

    // Function to fetch news from the backend
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

    // Function to fetch events from the backend
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

    // Function to fetch achievements from the backend
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

    // Function to fetch mobthly plan from the backend
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

    // Function to fetch monthly calendar from the backend
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

    // Function to fetch email list from the backend
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

    // Function to fetch QMS files from the backend
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

    // Function to fetch EMS files from the backend
    const fetchEmsFiles = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/ems');
            if (!response.ok) {
                throw new Error('Failed to fetch EMS files');
            }
            const data = await response.json();
            setEmsUploadedFiles(data.files || []);
        } catch (error) {
            console.error('Error fetching EMS files:', error);
            setEmsUploadedFiles([]);
        }
    };

    // Function to fetch H&W from the backend
    const fetchHwFiles = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/hw');
            if (!response.ok) {
                throw new Error('Failed to fetch H&W files');
            }
            const data = await response.json();
            setHwUploadedFiles(data.files || []);
        } catch (error) {
            console.error('Error fetching H&W files:', error);
            setHwUploadedFiles([]);
        }
    };

    // Function to fetch SOP files from the backend
    const fetchSopFiles = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/sop');
            if (!response.ok) {
                throw new Error('Failed to fetch SOP files');
            }
            const data = await response.json();
            setSopUploadedFiles(data.files || []);
        } catch (error) {
            console.error('Error fetching SOP files:', error);
            setSopUploadedFiles([]);
        }
    };

    // Function to fetch ISO files from the backend
    const fetchIsoFiles = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/iso');
            if (!response.ok) {
                throw new Error('Failed to fetch ISO files');
            }
            const data = await response.json();
            setIsoUploadedFiles(data.files || []);
        } catch (error) {
            console.error('Error fetching ISO files:', error);
            setIsoUploadedFiles([]); 
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
            fetchHwFiles();
            fetchSopFiles();
            fetchIsoFiles();
        } else if (activeTab === 'communication') {
            fetchEmailList();
        }
    }, [activeTab]);

    //== Functions in Carousel image section ==//
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

    //== Function in News section ==//
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

    const handleEdit = (item) => {
        setTitle(item.Title);
        setContent(item.Content);
        setEditingId(item.Id);
    };

    //== Functions in Events section ==//
    const handleEventInputChange = (e) => {
        const { name, value } = e.target;
        setEventForm({ ...eventForm, [name]: value });
    };

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

    const handleEditEvent = (event) => {
        setEventForm({
            title: event.Title,
            description: event.Description,
            eventDate: event.EventDate.split('T')[0],
        });
        setEditingId(event.Id);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredEvents = events.filter(event =>
        event.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.Description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //== Functions in Monthly plan - Calendar section ==//
    const handleMonthlyChange = (e) => {
        const file = e.target.files[0];
        setMonthlyPlanForm({ image: file });
        setMonthlyPreview(file ? URL.createObjectURL(file) : null);
    };

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

    //== Functions in Monthly calendar image - Calendar section ==//
    const handleCalendarChange = (e) => {
        const file = e.target.files[0];
        setCalendarForm({ image: file });
        setCalendarPreview(file ? URL.createObjectURL(file) : null);
    };

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

    //== Functions in Achievement section ==//
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

    //== Functions in Extension list - Communication section ==//
    const handleExtensionFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setUploadedFile(file);
            setUploadStatus('');
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
                setUploadedFile(null);
                fileInputRef.current.value = '';
            } else {
                setUploadStatus(`Error: ${data.error || 'Failed to upload file'}`);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadStatus('Upload failed. Please check the server connection.');
        }
    };

    //== Function in Email list - Communication section ==//
    const handleEmailFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setUploadedEmailFile(file);
            setUploadEmailStatus('');
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
            emailInputRef.current.value = '';
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadEmailStatus('Upload failed. Please check the server connection.');
        }
    };

    //== Functions in QMS files - policies and procedures ==//
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
            fetchQmsFiles();
            
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

    const handleRemoveQmsFile = (index) => {
        setQmsFiles(prev => prev.filter((_, i) => i !== index));
        if (qmsFiles.length === 1) {
            setUploadQmsStatus('');
        }
    };

    const handleClearQmsFiles = () => {
        setQmsFiles([]);
        setUploadQmsStatus('');
        if (qmsInputRef.current) {
            qmsInputRef.current.value = '';
        }
    };

    const handleDeleteQmsFile = async (filename) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this file?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3001/api/qms/${filename}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('File deleted successfully!');
                fetchQmsFiles();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to delete file'}`);
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete file. Please check the server connection.');
        }
    };

    //== Functions in EMS files - policies and procedures ==//
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
            fetchEmsFiles();
            
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

    const handleRemoveEmsFile = (index) => {
        setEmsFiles(prev => prev.filter((_, i) => i !== index));
        if (emsFiles.length === 1) {
            setUploadEmsStatus('');
        }
    };

    const handleClearEmsFiles = () => {
        setEmsFiles([]);
        setUploadEmsStatus('');
        if (emsInputRef.current) {
            emsInputRef.current.value = '';
        }
    };

    const handleDeleteEmsFiles = async (filename) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this file?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3001/api/ems/${filename}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('File deleted successfully!');
                fetchEmsFiles();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to delete file'}`);
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete file. Please check the server connection.');
        }
    };

    //== Functions in H&W files - policies and procedures ==//
    const handleHwFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => 
            file.type === 'application/pdf' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'text/plain' ||
            file.type.startsWith('image/')
        );
        if (validFiles.length !== selectedFiles.length) {
            setUploadHwStatus('Some files were skipped. Only PDF, DOC, DOCX, TXT, and images are allowed.');
        } else {
            setUploadHwStatus('');
        }
        setHwFiles(validFiles);
    };

    const handleUploadHw = async (e) => {
        e.preventDefault();
        if (!hwFiles || hwFiles.length === 0) {
            setUploadHwStatus('Please select at least one file to upload.');
            return;
        }

        const formData = new FormData();
        hwFiles.forEach((file, index) => {
            formData.append('hwFiles', file);
            console.log(`Added file ${index + 1}:`, file.name, 'Field: hwFiles');
        });

        try {
            console.log('Uploading to http://localhost:3001/api/hw');
            
            const response = await fetch('http://localhost:3001/api/hw', {
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
            
            setUploadHwStatus(`Success! ${data.message}`);
            setHwFiles([]);
            if (hwInputRef.current) {
                hwInputRef.current.value = '';
            }
            fetchHwFiles();
            
            setTimeout(() => {
                setUploadHwStatus('');
            }, 5000);
            
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadHwStatus(`Upload failed: ${error.message}`);
            
            setTimeout(() => {
                setUploadHwStatus('');
            }, 5000);
        }
    };

    const handleRemoveHwFile = (index) => {
        setHwFiles(prev => prev.filter((_, i) => i !== index));
        if (hwFiles.length === 1) {
            setUploadHwStatus('');
        }
    };

    const handleClearHwFiles = () => {
        setHwFiles([]);
        setUploadHwStatus('');
        if (hwInputRef.current) {
            hwInputRef.current.value = '';
        }
    };

    const handleDeleteHwFiles = async (filename) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this file?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3001/api/hw/${filename}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('File deleted successfully!');
                fetchHwFiles();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to delete file'}`);
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete file. Please check the server connection.');
        }
    };

    //== Functions in SOP files - policies and procedures ==//
    const handleSopFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => 
            file.type === 'application/pdf' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'text/plain' ||
            file.type.startsWith('image/')
        );
        if (validFiles.length !== selectedFiles.length) {
            setUploadSopStatus('Some files were skipped.Only PDF, DOC, DOCX, TXT and images are allowed');
        } else {
            setUploadSopStatus('');
        }
        setSopFiles(validFiles);
    };

    const handleUploadSop = async (e) => {
        e.preventDefault();
        if (!sopFiles || sopFiles.length === 0) {
            setUploadSopStatus('Please select at least one file to upload.');
            return;
        }

        const formData = new FormData();
        sopFiles.forEach((file, index) => {
            formData.append('sopFiles', file);
            console.log(`Added file ${index + 1}:`, file.name, 'Field: sopFiles');
        });

        try {
            console.log('Uploading to http://localhost:3001/api/sop');
            
            const response = await fetch('http://localhost:3001/api/sop', {
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
            
            setUploadSopStatus(`Success! ${data.message}`);
            setSopFiles([]);
            if (sopInputRef.current) {
                sopInputRef.current.value = '';
            }
            fetchSopFiles();
            
            setTimeout(() => {
                setUploadSopStatus('');
            }, 5000);
            
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadSopStatus(`Upload failed: ${error.message}`);
            
            setTimeout(() => {
                setUploadSopStatus('');
            }, 5000);
        }
    };

    const handleRemoveSopFile = (index) => {
        setSopFiles(prev => prev.filter((_, i) => i !== index));
        if (sopFiles.length === 1) {
            setUploadSopStatus('');
        }
    };

    const handleClearSopFiles = () => {
        setSopFiles([]);
        setUploadSopStatus('');
        if (sopInputRef.current) {
            sopInputRef.current.value = '';
        }
    };

    const handleDeleteSopFile = async (filename) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this file?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3001/api/sop/${filename}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('File deleted successfully!');
                fetchSopFiles();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to delete file'}`);
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete file. Please check the server connection.');
        }
    };

    //== Functions in ISO files - policies and procedures ==//
    const handleIsoFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => 
            file.type === 'application/pdf' ||
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'text/plain' ||
            file.type.startsWith('image/')
        );

        if (validFiles.length !== selectedFiles.length) {
            setUploadIsoStatus('Some files were skipped.Only PDF, DOC, Docx, TXT and images are allowed');
        } else {
            setUploadIsoStatus('');
        }
        setIsoFiles(validFiles);
    };

    const handleUploadIso = async (e) => {
        e.preventDefault();
        if (!isoFiles || isoFiles.length === 0) {
            setUploadIsoStatus('Please select at least one file to upload.');
            return;
        }

        const formData = new FormData();
        isoFiles.forEach((file, index) => {
            formData.append('isoFiles', file);
            console.log(`Added file ${index + 1}:`, file.name, 'Field: isoFiles');
        });

        try {
            console.log('Uploading to http://localhost:3001/api/iso');
            
            const response = await fetch('http://localhost:3001/api/iso', {
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
            
            setUploadIsoStatus(`Success! ${data.message}`);
            setIsoFiles([]);
            if (isoInputRef.current) {
                isoInputRef.current.value = '';
            }
            fetchIsoFiles();
            
            setTimeout(() => {
                setUploadIsoStatus('');
            }, 5000);
            
        } catch (error) {
            console.error('Upload failed:', error);
            setUploadIsoStatus(`Upload failed: ${error.message}`);
            
            setTimeout(() => {
                setUploadIsoStatus('');
            }, 5000);
        }
    };

    const handleRemoveIsoFile = (index) => {
        setIsoFiles(prev => prev.filter((_, i) => i !== index));
        if (isoFiles.length === 1) {
            setUploadIsoStatus('');
        }
    };

    const handleClearIsoFiles = () => {
        setIsoFiles([]);
        setUploadIsoStatus('');
        if (isoInputRef.current) {
            isoInputRef.current.value = '';
        }
    };

    const handleDeleteIsoFile = async (filename) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this file?');
        if (!isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3001/api/iso/${filename}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('File deleted successfully!');
                fetchIsoFiles();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || 'Failed to delete file'}`);
            }
        } catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete file. Please check the server connection.');
        }
    };

    // Application list
    // const applications = [
    //     { id: 'hr', name: 'Human Resource Management', icon: <FiUsers />, color: 'from-blue-500 to-blue-600' },
    //     { id: 'medical', name: 'Medical', icon: <FiFileText />, color: 'from-green-500 to-green-600' },
    //     { id: 'display', name: 'Display Panel', icon: <FiImage />, color: 'from-purple-500 to-purple-600' },
    //     { id: 'appraisal', name: 'Appraisal', icon: <FiFileText />, color: 'from-orange-500 to-orange-600' },
    //     { id: 'feedback', name: 'Feedback Form', icon: <FiMessageSquare />, color: 'from-pink-500 to-pink-600' },
    //     { id: 'nonconformity', name: 'Non-Conformity', icon: <FiSettings />, color: 'from-red-500 to-red-600' },
    //     { id: 'sfa', name: 'SFA', icon: <FiSettings />, color: 'from-indigo-500 to-indigo-600' },
    //     { id: 'ifs', name: 'IFS', icon: <FiSettings />, color: 'from-teal-500 to-teal-600' },
    //     { id: 'kpi', name: 'KPI', icon: <FiSettings />, color: 'from-cyan-500 to-cyan-600' },
    //     { id: 'wms', name: 'WMS', icon: <FiSettings />, color: 'from-lime-500 to-lime-600' },
    //     { id: 'docware', name: 'Docware', icon: <FiSettings />, color: 'from-amber-500 to-amber-600' },
    //     { id: 'production display', name: 'Production Display', icon: <FiSettings />, color: 'from-emerald-500 to-emerald-600' }
    // ];

    const renderContent = () => {
        switch (activeTab) {
            case 'carousel':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Company Image Carousel</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Add New Image to Carousel</h3>
                                <form onSubmit={handleUpload} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={carouselForm.title}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter image title"
                                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-400 file:text-white hover:file:bg-blue-500 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center h-48">
                                            {previewImage ? (
                                                <img src={previewImage} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
                                            ) : (
                                                <div className="text-center text-gray-400">
                                                    <FiImage className="w-12 h-12 mx-auto mb-2" />
                                                    <span>Image preview will appear here</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4 mt-6">
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
                                            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                            <h3 className='text-xl font-bold text-gray-800 mb-6'>Manage Existing Images</h3>
                            <div className="overflow-x-auto rounded-xl">
                                <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {carouselImages.length > 0 ? (
                                            carouselImages.map((image) => (
                                                <tr key={image.Id} className='hover:bg-gray-50 transition-colors'>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {image.Title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="h-20 w-20 border border-gray-200 rounded-lg overflow-hidden mx-auto">
                                                            <img
                                                                src={`http://localhost:3001${image.ImagePath}`}
                                                                alt={image.Title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className='flex justify-start space-x-3'>
                                                            <button
                                                                onClick={() => handleDeleteCarousel(image.Id)}
                                                                className="bg-gradient-to-r from-red-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-600 transition-all transform hover:scale-105"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center py-8 text-gray-500">
                                                    <FiImage className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                                    No images found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'news':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">News & Announcements</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800">{editingId ? 'Edit News' : 'Add News & Announcements'}</h3>
                            <form onSubmit={handleAddOrUpdate} className="space-y-6">
                                <div>
                                    <label className='font-semibold text-gray-700 block mb-2'>Title:</label>
                                    <input
                                        type="text"
                                        placeholder="News Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className='font-semibold text-gray-700 block mb-2'>Content:</label>
                                    <textarea
                                        placeholder="News Content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="w-2/4 flex space-x-4 pt-2">
                                    <button type="submit" className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105">
                                        {editingId ? 'Update' : 'Add'}
                                    </button>
                                    <button type="button" onClick={() => {
                                        setTitle('');
                                        setContent('');
                                        setEditingId(null);
                                    }} className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-all">
                                        Clear
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-800">Manage News & Announcements</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search news..."
                                        className="border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <IoSearchOutline className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                                </div>
                            </div>

                            <div className="overflow-x-auto rounded-xl">
                                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Content</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {news.length > 0 ? (
                                            news.map((item) => (
                                                <tr key={item.Id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{item.Content}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.CreatedAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            <button
                                                                onClick={() => handleEdit(item)}
                                                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteNews(item.Id)}
                                                                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                                    <FaNewspaper className="w-12 h-12 mx-auto mb-2 text-gray-300" />
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

            case 'calendar':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Working Calendar</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">{editingId ? 'Edit Event' : 'Add New Event'}</h3>
                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                                    <form onSubmit={handleEventSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={eventForm.title}
                                                        onChange={handleEventInputChange}
                                                        placeholder="Enter event title"
                                                        className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">Event Date</label>
                                                    <input
                                                        type="date"
                                                        name="eventDate"
                                                        value={eventForm.eventDate}
                                                        onChange={handleEventInputChange}
                                                        className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={eventForm.description}
                                                    onChange={handleEventInputChange}
                                                    placeholder="Enter event description"
                                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-4 mt-6">
                                            <button
                                                type="submit"
                                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50"
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
                                                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Monthly Plan Image Upload */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Monthly Plan Image</h3>
                                    <form onSubmit={handleUploadMonthly} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Upload Monthly Plan</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleMonthlyChange}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                                            />
                                        </div>
                                        {monthlyPreview && (
                                            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <img src={monthlyPreview} alt="Monthly Preview" className="max-h-48 max-w-full object-contain mx-auto rounded-lg" />
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 disabled:opacity-50"
                                            disabled={!monthlyPlanForm.image}
                                        >
                                            Upload Monthly Plan
                                        </button>
                                    </form>
                                    {currentMonthlyImage && (
                                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                            <p className="text-sm font-medium mb-2 text-gray-700">Current Monthly Plan:</p>
                                            <img src={`http://localhost:3001${currentMonthlyImage}`} alt="Current Monthly" className="max-h-48 max-w-full object-contain mx-auto rounded-lg" />
                                        </div>
                                    )}
                                </div>

                                {/* Calendar Image Upload */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Calendar Image</h3>
                                    <form onSubmit={handleUploadCalendar} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Upload Calendar Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleCalendarChange}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                                            />
                                        </div>
                                        {calendarPreview && (
                                            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <img src={calendarPreview} alt="Calendar Preview" className="max-h-48 max-w-full object-contain mx-auto rounded-lg" />
                                            </div>
                                        )}
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 disabled:opacity-50"
                                            disabled={!calendarForm.image}
                                        >
                                            Upload Calendar Image
                                        </button>
                                    </form>
                                    {currentCalendarImage && (
                                        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                            <p className="text-sm font-medium mb-2 text-gray-700">Current Calendar Image:</p>
                                            <img src={`http://localhost:3001${currentCalendarImage}`} alt="Current Calendar" className="max-h-48 max-w-full object-contain mx-auto rounded-lg" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Manage Existing Events</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <IoSearchOutline className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div className="overflow-x-auto rounded-xl">
                                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredEvents.length > 0 ? (
                                            filteredEvents.map((event) => (
                                                <tr key={event.Id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.Title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{event.Description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(event.EventDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            <button
                                                                onClick={() => handleEditEvent(event)}
                                                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteEvent(event.Id)}
                                                                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                                    <FiCalendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
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

            // case 'applications':
            //     return (
            //         <div className="space-y-6">
            //             <div className="flex items-center justify-between mb-6">
            //                 <h2 className="text-2xl font-bold text-gray-800">Applications</h2>
            //                 <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
            //             </div>
            //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            //                 {applications.map(app => (
            //                     <div
            //                         key={app.id}
            //                         className={`bg-white rounded-2xl shadow-lg p-6 border-2 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            //                             activeApplication === app.id 
            //                             ? `border-gradient ${app.color} border-transparent bg-gradient-to-br ${app.color} text-white` 
            //                             : 'border-gray-200 hover:border-gray-300'
            //                         }`}
            //                         onClick={() => setActiveApplication(app.id)}
            //                     >
            //                         <div className="flex items-center space-x-4">
            //                             <div className={`p-3 rounded-xl ${
            //                                 activeApplication === app.id 
            //                                 ? 'bg-white bg-opacity-20' 
            //                                 : `bg-gradient-to-br ${app.color} text-white`
            //                             }`}>
            //                                 {app.icon}
            //                             </div>
            //                             <div>
            //                                 <h3 className="font-bold text-lg">{app.name}</h3>
            //                                 <p className={`text-sm ${
            //                                     activeApplication === app.id 
            //                                     ? 'text-white text-opacity-90' 
            //                                     : 'text-gray-500'
            //                                 }`}>
            //                                     Manage {app.name.toLowerCase()}
            //                                 </p>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 ))}
            //             </div>
            //         </div>
            //     );

            case 'policies':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Policies & Procedures</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        </div>
                        
                        {/* QMS Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Quality Management System (QMS)</h3>
                            <p className="text-gray-600 mb-6">
                                Manage all your QMS documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            
                            <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                <h4 className="text-lg font-semibold mb-4 text-gray-800">Upload QMS Documents</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                </p>
                                <form onSubmit={handleUploadQms}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Files (Multiple files allowed)
                                        </label>
                                        <input
                                            type="file"
                                            ref={qmsInputRef}
                                            onChange={handleQmsFilesChange}
                                            accept=".pdf,.doc,.docx,.txt,image/*"
                                            multiple
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                                        />
                                    </div>
                                    
                                    {qmsFiles.length > 0 && (
                                        <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                                            <h5 className="font-medium mb-2 text-gray-700">Selected Files ({qmsFiles.length}):</h5>
                                            <ul className="space-y-2 max-h-32 overflow-y-auto">
                                                {qmsFiles.map((file, index) => (
                                                    <li key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                                                        <span className="truncate flex-1 text-gray-600">{file.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveQmsFile(index)}
                                                            className="ml-2 text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <FiX className="w-4 h-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className={`text-sm mb-4 ${uploadQmsStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                                        {uploadQmsStatus}
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50"
                                            disabled={qmsFiles.length === 0}
                                        >
                                            Upload {qmsFiles.length > 0 ? `(${qmsFiles.length})` : ''} Files
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClearQmsFiles}
                                            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </form>

                                {/* Uploaded Files List */}
                                <div className="mt-8">
                                    <h5 className="text-lg font-semibold mb-4 text-gray-800">Uploaded QMS Documents ({qmsUploadedFiles.length})</h5>
                                    {qmsUploadedFiles.length > 0 ? (
                                        <div className="space-y-3">
                                            {qmsUploadedFiles.map((file) => (
                                                <div key={file.filename} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800 truncate">{file.filename}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <a
                                                            href={`http://localhost:3001${file.filePath}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
                                                        >
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteQmsFile(file.filename)}
                                                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm"
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

                        {/* EMS Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Environmental management Systems (EMS)</h3>
                            <p className="text-gray-600 mb-6">
                                Manage all your EMS documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            
                            <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                <h4 className="text-lg font-semibold mb-4 text-gray-800">Upload EMS Documents</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                </p>
                                <form onSubmit={handleUploadEms}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Files (Multiple files allowed)
                                        </label>
                                        <input
                                            type="file"
                                            ref={emsInputRef}
                                            onChange={handleEmsFileChange}
                                            accept=".pdf,.doc,.docx,.txt,image/*"
                                            multiple
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                                        />
                                    </div>
                                    
                                    {emsFiles.length > 0 && (
                                        <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                                            <h5 className="font-medium mb-2 text-gray-700">Selected Files ({emsFiles.length}):</h5>
                                            <ul className="space-y-2 max-h-32 overflow-y-auto">
                                                {emsFiles.map((file, index) => (
                                                    <li key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                                                        <span className="truncate flex-1 text-gray-600">{file.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveEmsFile(index)}
                                                            className="ml-2 text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <FiX className="w-4 h-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className={`text-sm mb-4 ${uploadEmsStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                                        {uploadEmsStatus}
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50"
                                            disabled={emsFiles.length === 0}
                                        >
                                            Upload {emsFiles.length > 0 ? `(${emsFiles.length})` : ''} Files
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClearEmsFiles}
                                            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </form>

                                {/* Uploaded Files List */}
                                <div className="mt-8">
                                    <h5 className="text-lg font-semibold mb-4 text-gray-800">Uploaded SOP Documents ({emsUploadedFiles.length})</h5>
                                    {emsUploadedFiles.length > 0 ? (
                                        <div className="space-y-3">
                                            {emsUploadedFiles.map((file) => (
                                                <div key={file.filename} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800 truncate">{file.filename}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <a
                                                            href={`http://localhost:3001${file.filePath}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
                                                        >
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteEmsFiles(file.filename)}
                                                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm"
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

                        {/* SOP Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Standard Operating Procedures (SOP)</h3>
                            <p className="text-gray-600 mb-6">
                                Manage all your SOP documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            
                            <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                <h4 className="text-lg font-semibold mb-4 text-gray-800">Upload SOP Documents</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                </p>
                                <form onSubmit={handleUploadSop}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Files (Multiple files allowed)
                                        </label>
                                        <input
                                            type="file"
                                            ref={sopInputRef}
                                            onChange={handleSopFileChange}
                                            accept=".pdf,.doc,.docx,.txt,image/*"
                                            multiple
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                                        />
                                    </div>
                                    
                                    {sopFiles.length > 0 && (
                                        <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                                            <h5 className="font-medium mb-2 text-gray-700">Selected Files ({sopFiles.length}):</h5>
                                            <ul className="space-y-2 max-h-32 overflow-y-auto">
                                                {sopFiles.map((file, index) => (
                                                    <li key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                                                        <span className="truncate flex-1 text-gray-600">{file.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSopFile(index)}
                                                            className="ml-2 text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <FiX className="w-4 h-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className={`text-sm mb-4 ${uploadSopStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                                        {uploadSopStatus}
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50"
                                            disabled={sopFiles.length === 0}
                                        >
                                            Upload {sopFiles.length > 0 ? `(${sopFiles.length})` : ''} Files
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClearSopFiles}
                                            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </form>

                                {/* Uploaded Files List */}
                                <div className="mt-8">
                                    <h5 className="text-lg font-semibold mb-4 text-gray-800">Uploaded SOP Documents ({sopUploadedFiles.length})</h5>
                                    {sopUploadedFiles.length > 0 ? (
                                        <div className="space-y-3">
                                            {sopUploadedFiles.map((file) => (
                                                <div key={file.filename} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800 truncate">{file.filename}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <a
                                                            href={`http://localhost:3001${file.filePath}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
                                                        >
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteSopFile(file.filename)}
                                                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">No SOP documents uploaded yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ISO Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">International Organization for Standardization (ISO) </h3>
                            <p className="text-gray-600 mb-6">
                                Manage all your ISO documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            
                            <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                <h4 className="text-lg font-semibold mb-4 text-gray-800">Upload ISO Documents</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                </p>
                                <form onSubmit={handleUploadIso}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Files (Multiple files allowed)
                                        </label>
                                        <input
                                            type="file"
                                            ref={isoInputRef}
                                            onChange={handleIsoFileChange}
                                            accept=".pdf,.doc,.docx,.txt,image/*"
                                            multiple
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                                        />
                                    </div>
                                    
                                    {isoFiles.length > 0 && (
                                        <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                                            <h5 className="font-medium mb-2 text-gray-700">Selected Files ({isoFiles.length}):</h5>
                                            <ul className="space-y-2 max-h-32 overflow-y-auto">
                                                {isoFiles.map((file, index) => (
                                                    <li key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                                                        <span className="truncate flex-1 text-gray-600">{file.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveIsoFile(index)}
                                                            className="ml-2 text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <FiX className="w-4 h-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className={`text-sm mb-4 ${uploadIsoStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                                        {uploadIsoStatus}
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50"
                                            disabled={isoFiles.length === 0}
                                        >
                                            Upload {isoFiles.length > 0 ? `(${isoFiles.length})` : ''} Files
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClearIsoFiles}
                                            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </form>

                                {/* Uploaded Files List */}
                                <div className="mt-8">
                                    <h5 className="text-lg font-semibold mb-4 text-gray-800">Uploaded SOP Documents ({isoUploadedFiles.length})</h5>
                                    {isoUploadedFiles.length > 0 ? (
                                        <div className="space-y-3">
                                            {isoUploadedFiles.map((file) => (
                                                <div key={file.filename} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800 truncate">{file.filename}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <a
                                                            href={`http://localhost:3001${file.filePath}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
                                                        >
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteIsoFile(file.filename)}
                                                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">No ISO documents uploaded yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* H&W sections */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Health & Welfare </h3>
                            <p className="text-gray-600 mb-6">
                                Manage all your H&W documents including SOPs, ISO documentation, policies, and procedures.
                                You can upload multiple files at once.
                            </p>
                            
                            <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                <h4 className="text-lg font-semibold mb-4 text-gray-800">Upload H&W Documents</h4>
                                <p className="text-sm text-gray-600 mb-4">
                                    Select multiple files (PDF, DOC, DOCX, TXT, images) to upload
                                </p>
                                <form onSubmit={handleUploadHw}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Files (Multiple files allowed)
                                        </label>
                                        <input
                                            type="file"
                                            ref={hwInputRef}
                                            onChange={handleHwFileChange}
                                            accept=".pdf,.doc,.docx,.txt,image/*"
                                            multiple
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-colors"
                                        />
                                    </div>
                                    
                                    {hwFiles.length > 0 && (
                                        <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                                            <h5 className="font-medium mb-2 text-gray-700">Selected Files ({hwFiles.length}):</h5>
                                            <ul className="space-y-2 max-h-32 overflow-y-auto">
                                                {isoFiles.map((file, index) => (
                                                    <li key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                                                        <span className="truncate flex-1 text-gray-600">{file.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveHwFile(index)}
                                                            className="ml-2 text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <FiX className="w-4 h-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    <div className={`text-sm mb-4 ${uploadHwStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                                        {uploadHwStatus}
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50"
                                            disabled={hwFiles.length === 0}
                                        >
                                            Upload {hwFiles.length > 0 ? `(${hwFiles.length})` : ''} Files
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClearHwFiles}
                                            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </form>

                                {/* Uploaded Files List */}
                                <div className="mt-8">
                                    <h5 className="text-lg font-semibold mb-4 text-gray-800">Uploaded SOP Documents ({hwUploadedFiles.length})</h5>
                                    {hwUploadedFiles.length > 0 ? (
                                        <div className="space-y-3">
                                            {hwUploadedFiles.map((file) => (
                                                <div key={file.filename} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-800 truncate">{file.filename}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <a
                                                            href={`http://localhost:3001${file.filePath}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all text-sm"
                                                        >
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteHwFiles(file.filename)}
                                                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">No H&W documents uploaded yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>


                    </div>
                );

            case 'communication':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Communication</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Email Management */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                                    <FiMail className="mr-3 h-6 w-6 text-blue-500" /> Email Management
                                </h3>
                                <div className="space-y-4">
                                    <button className="w-full text-left px-4 py-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-800 hover:from-blue-100 hover:to-cyan-100 transition-all transform hover:scale-105 border border-blue-200">
                                        Send Bulk Email
                                    </button>
                                    <button className="w-full text-left px-4 py-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-800 hover:from-blue-100 hover:to-cyan-100 transition-all transform hover:scale-105 border border-blue-200">
                                        Email Templates
                                    </button>
                                    <button className="w-full text-left px-4 py-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 text-gray-800 hover:from-blue-100 hover:to-cyan-100 transition-all transform hover:scale-105 border border-blue-200">
                                        Subscriber List
                                    </button>
                                </div>
                            </div>

                            {/* File Upload Sections */}
                            <div className="space-y-6">
                                {/* Extension Upload */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Upload Extension List</h4>
                                    <form onSubmit={handleUploadExtension}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Select PDF File
                                            </label>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleExtensionFileChange}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-400 file:text-white hover:file:bg-blue-500"
                                            />
                                        </div>
                                        <div className={`text-sm mb-4 ${uploadStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                                            {uploadStatus}
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50"
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
                                                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Email List Upload */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Upload Email List</h4>
                                    <form onSubmit={handleUploadEmail}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Select PDF File
                                            </label>
                                            <input
                                                type="file"
                                                ref={emailInputRef}
                                                onChange={handleEmailFileChange}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-400 file:text-white hover:file:bg-blue-600"
                                            />
                                        </div>
                                        <div className={`text-sm mb-4 ${uploadEmailStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                                            {uploadEmailStatus}
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                type="submit"
                                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50"
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
                                                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Current Email List Display */}
                        {currentEmailFile && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
                                <h4 className="text-lg font-semibold mb-4 text-gray-800">Current Email List</h4>
                                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                                    <a
                                        href={`http://localhost:3001${currentEmailFile}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-700 hover:text-green-800 flex-1 truncate flex items-center"
                                        title={currentEmailFile.split('/').pop()}
                                    >
                                        <FiFileText className="w-5 h-5 mr-2" />
                                        {currentEmailFile.split('/').pop()}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'achievements':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">
                                {editingAchievementId ? 'Edit Achievement' : 'Add New Achievement'}
                            </h3>
                            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
                                <form onSubmit={handleAchievementSubmit}>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                                <input 
                                                    type="text" 
                                                    name="title" 
                                                    value={achievementForm.title} 
                                                    onChange={handleAchievementInputChange} 
                                                    placeholder="Enter achievement title" 
                                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea 
                                                    name="description" 
                                                    value={achievementForm.description} 
                                                    onChange={handleAchievementInputChange} 
                                                    placeholder="Enter description of achievement" 
                                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-24" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                                <input 
                                                    type="date" 
                                                    name="achievementDate" 
                                                    value={achievementForm.achievementDate} 
                                                    onChange={handleAchievementInputChange} 
                                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-gray-700">Image (Optional)</label>
                                                <input 
                                                    type="file" 
                                                    name="image" 
                                                    accept="image/*" 
                                                    onChange={handleAchievementInputChange} 
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600" 
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                                            <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                                                {previewImage ? (
                                                    <img src={previewImage} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
                                                ) : (
                                                    <div className="text-center text-gray-400">
                                                        <FiImage className="w-12 h-12 mx-auto mb-2" />
                                                        <span>Image preview will appear here</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end space-x-4 mt-6">
                                        <button 
                                            type="submit" 
                                            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg hover:from-sky-600 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50"
                                            disabled={!achievementForm.title || !achievementForm.description || !achievementForm.achievementDate}
                                        >
                                            {editingAchievementId ? 'Update Achievement' : 'Save Achievement'}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => { 
                                                setAchievementForm({ title: '', description: '', achievementDate: '', image: null }); 
                                                setPreviewImage(null); 
                                                setEditingAchievementId(null); 
                                            }} 
                                            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Manage Existing Achievements</h3>
                            <div className="overflow-x-auto rounded-xl">
                                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
                                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {achievements.length > 0 ? (
                                            achievements.map((achievement) => (
                                                <tr key={achievement.Id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{achievement.Title}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{achievement.Description}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(achievement.AchievementDate).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {achievement.ImagePath ? (
                                                            <img src={`http://localhost:3001${achievement.ImagePath}`} alt={achievement.Title} className="h-16 w-16 object-cover rounded-lg mx-auto" />
                                                        ) : (
                                                            <div className="h-16 w-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                                                                <FiImage className="w-6 h-6 text-gray-400" />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            <button 
                                                                onClick={() => handleEditAchievement(achievement)} 
                                                                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteAchievement(achievement.Id)} 
                                                                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-8 text-gray-500">
                                                    <FiAward className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                                    No achievements found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold text-gray-600">Select a category from the left menu</h3>
                    </div>
                );
        }
    };

    // Render success message if present
    if (successMessage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8 transform transition-all">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.02]">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                            <FiLock className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            DSI Admin Portal
                        </h2>
                        <p className="mt-2 text-sm text-gray-500 font-medium">
                            Securely access your admin dashboard
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-300"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all duration-300"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="group relative flex-1 justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="group relative flex-1 justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                            >
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
        <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Navbar />
            <div className="flex flex-1 overflow-hidden pt-16">
                {/* Sidebar */}
                <div className="w-80 bg-gradient-to-b from-white to-blue-50 text-gray-800 p-6 overflow-y-auto border-r border-gray-200 shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            DSI Admin Panel
                        </h1>
                        <p className="text-sm text-gray-500 mt-2">Management Dashboard</p>
                    </div>
                    <nav className="space-y-2">
                        {[
                            { id: 'carousel', label: 'Image Carousel', icon: FiImage, color: 'from-cyan-500 to-blue-500' },
                            { id: 'news', label: 'News & Announcements', icon: FaNewspaper, color: 'from-cyan-500 to-blue-500' },
                            { id: 'calendar', label: 'Working Calendar', icon: FiCalendar, color: 'from-cyan-500 to-blue-500' },
                            // { id: 'applications', label: 'Applications', icon: FiSettings, color: 'from-teal-500 to-cyan-500' },
                            { id: 'policies', label: 'Policies & Procedures', icon: FiFileText, color: 'from-cyan-500 to-blue-500' },
                            { id: 'communication', label: 'Communication', icon: FiMail, color: 'from-cyan-500 to-blue-500' },
                            { id: 'achievements', label: 'Achievements', icon: FiAward, color: 'from-cyan-500 to-blue-500' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left px-4 py-4 rounded-xl flex items-center space-x-4 transition-all duration-300 transform hover:scale-105 ${
                                    activeTab === item.id 
                                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
                                }`}
                            >
                                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : `text-${item.color.split('-')[1]}-500`}`} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-4 rounded-xl flex items-center space-x-4 bg-white text-gray-700 hover:bg-red-50 hover:text-red-700 border border-gray-200 transition-all duration-300 transform hover:scale-105 mt-8"
                        >
                            <TbLogout className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 min-h-full border border-gray-100">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <footer className='bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4 text-center'>
                <p className='text-sm'>
                    {COPYRIGHT_TEXT} {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
};

export default Admin;