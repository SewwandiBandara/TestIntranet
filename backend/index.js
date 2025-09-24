const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const app = express();

// Create the uploads directories if they don't exist
const baseUploadsDir = path.join(__dirname, 'Uploads');
const carouselDir = path.join(baseUploadsDir, 'Carousel');
const calendarDir = path.join(baseUploadsDir, 'Calendar');
const monthDir = path.join(baseUploadsDir, 'Month');
const achievementsDir = path.join(baseUploadsDir, 'Achievements');
const extensionsDir = path.join(baseUploadsDir, 'Contacts');

[baseUploadsDir, carouselDir, calendarDir, achievementsDir, monthDir, extensionsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});


/// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;
        console.log(`Request path: ${req.path}`);
        if (req.path.includes('/api/carousel')) {
            uploadPath = carouselDir;
        } else if (req.path.includes('/api/monthly-plan')) {
            uploadPath = calendarDir;
        } else if (req.path.includes('/api/achievements')) {
            uploadPath = achievementsDir;
        } else if (req.path.includes('/api/calendar-image')) {
            uploadPath = monthDir;
        } else if (req.path.includes('/api/extension')) {
            uploadPath = extensionsDir;    
        } else {
            uploadPath = baseUploadsDir;
        }
        console.log(`Saving to: ${uploadPath}`);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let prefix = '';
        if (req.path.includes('/api/carousel')) {
            prefix = 'carousel-';
        } else if (req.path.includes('/api/monthly-plan')) {
            prefix = 'monthly-plan-';
        } else if (req.path.includes('/api/achievements')) {
            prefix = 'achievement-';
        } else if (req.path.includes('/api/calendar-image')) {
            prefix = 'calendar-';
        } else if (req.path.includes('/api/extension')) {
            prefix = 'extension-';    
        } else {
            prefix = 'upload-';
        }
        cb(null, prefix + uniqueSuffix + path.extname(file.originalname));
    }
});



const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (req.path.includes('/api/extension')) {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Only PDF files are allowed for extensions'), false);
            }
        } else {
            const filetypes = /jpeg|jpg|png/;
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);
            if (extname && mimetype) {
                cb(null, true);
            } else {
                cb(new Error('Only JPEG/PNG images are allowed'), false);
            }
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Global error handler
app.use((err, req, res, next) => {
    console.error('Express global error:', {
        message: err.message,
        stack: err.stack,
        code: err.code,
        path: req.path,
        method: req.method
    });
    res.status(500).json({ error: `Internal server error: ${err.message}` });
});

// Serve static images from the uploads directory
app.use('/backend/uploads', express.static(baseUploadsDir));

// Database connection
const dbConfig = {
    server: process.env.DB_SERVER,
    instanceName: process.env.DB_INSTANCE,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    port: parseInt(process.env.DB_PORT),
};
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('MSSQL database connection is successful');
    }
});

//Login API
app.post('/api/login', async (req, res) => {
    console.log('Login attempt:', { username: req.body.username, timestamp: new Date().toISOString() });
    const {username, password} = req.body;
    if (username === 'Admin' && password === 'admin123') {
        console.log('Login successful');
        res.json({ success: true, token: 'admin-token-123', message: 'Login Successful!' });
    } else {
        console.log('Login failed: invalid credentials');
        res.status(401).json({success: false, error: 'Invalid credentials'});
    }
});

/// Image carousel to manage campany carousel
app.get('/api/carousel', async (req, res) => {
    try {
        const files = await fs.promises.readdir(carouselDir);
        const carouselImages = files.map(filename => ({
            Title: filename,
            ImagePath: `/backend/uploads/Carousel/${filename}`
        }));
        res.json(carouselImages);
    } catch (err) {
        console.error('Error fetching carousel images:', err);
        res.status(500).json({ error: 'Failed to fetch carousel images' });
    }
});

app.post('/api/carousel', upload.single('image'), async (req, res) => {
    try {
        const { title } = req.body;
        console.log('Received carousel upload:', { title, file: req.file });
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required.' });
        }
        res.status(201).json({
            message: 'Image uploaded successfully!',
            imagePath: `/backend/uploads/Carousel/${req.file.filename}`
        });
    } catch (err) {
        console.error('Error uploading carousel image:', {
            message: err.message,
            stack: err.stack
        });
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

app.delete('/api/carousel/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(carouselDir, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ message: 'Image deleted successfully!' });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ error: 'Failed to delete image' });
    }
});

// News and announcements
app.get('/api/news', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM NewsAndAnnouncements ORDER BY CreatedAt DESC');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching news:', err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.post('/api/news', async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('Title', sql.NVarChar, title)
            .input('Content', sql.NVarChar, content)
            .query('INSERT INTO NewsAndAnnouncements (Title, Content, CreatedAt) VALUES (@Title, @Content, GETDATE())');
        res.status(201).json({ message: 'News item added successfully!' });
    } catch (err) {
        console.error('Error adding news item:', err);
        res.status(500).json({ error: 'Failed to add news item' });
    }
});

// app.put('/api/news/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title, content } = req.body;
//         const pool = await sql.connect(dbConfig);
//         const result = await pool.request()
//             .input('Id', sql.Int, id)
//             .input('Title', sql.NVarChar, title)
//             .input('Content', sql.NVarChar, content)
//             .query('UPDATE NewsAndAnnouncements SET Title = @Title, Content = @Content WHERE Id = @Id');
//         if (result.rowsAffected[0] === 0) {
//             return res.status(404).json({ error: 'News item not found' });
//         }
//         res.status(200).json({ message: 'News item updated successfully!' });
//     } catch (err) {
//         console.error('Error updating news item:', err);
//         res.status(500).json({ error: 'Failed to update news item' });
//     }
// });

app.put('/api/news/:id', async (req, res) => {
    try {
        console.log('Received PUT /api/news/:id at', new Date().toISOString());
        console.log('Request params:', req.params);
        console.log('Request body:', req.body);
        console.log('File:', req.file);

        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            console.log('Missing required fields:', { title, content });
            return res.status(400).json({ error: 'Title and content are required.' });
        }

        const pool = await sql.connect(dbConfig);
        
        // Check if the news item exists
        const checkExists = await pool.request()
            .input('Id', sql.Int, id)
            .query('SELECT * FROM NewsAndAnnouncements WHERE Id = @Id');

        if (checkExists.recordset.length === 0) {
            console.log('No news item found for ID:', id);
            return res.status(404).json({ error: 'News item not found' });
        }

        const request = pool.request()
            .input('Id', sql.Int, id)
            .input('Title', sql.NVarChar, title)
            .input('Content', sql.NVarChar, content);

        console.log('Executing update query with inputs:', {
            Id: id,
            Title: title,
            Content: content
        });

        const result = await request.query(
            'UPDATE NewsAndAnnouncements SET Title = @Title, Content = @Content WHERE Id = @Id'
        );

        console.log('Rows affected by update:', result.rowsAffected[0]);

        if (result.rowsAffected[0] === 0) {
            console.log('News not found for ID:', id);
            return res.status(404).json({ error: 'News not found' });
        }

        console.log('News updated successfully');
        res.status(200).json({ message: 'News updated successfully!' });
    } 
    catch (err) {
        console.error('Error updating news:', {
            message: err.message,
            stack: err.stack,
            code: err.code,
            sqlState: err.sqlState
        });
        res.status(500).json({ error: 'Failed to update news' });
    }
});

app.delete('/api/news/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            console.error('Invalid ID received:', req.params.id);
            return res.status(400).json({ error: 'Invalid ID provided.' });
        }
        console.log('Deleting news item with ID:', id);
        const pool = await sql.connect(dbConfig);
        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .query('DELETE FROM NewsAndAnnouncements WHERE Id = @id');
        if (result.rowsAffected[0] === 0) {
            console.log('No news item found with ID:', id);
            return res.status(404).json({ error: 'News item not found' });
        }
        res.status(200).json({ message: 'News item deleted successfully!' });
    } catch (err) {
        console.error('Error deleting news item:', err.message, err.stack);
        res.status(500).json({ error: 'Failed to delete news item' });
    }
});

// Calendar events
app.get('/api/calendar', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT Id, Title, Description, EventDate FROM CalendarEvents');
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        res.status(500).json({ error: 'Failed to fetch calendar events' });
    }
});

app.post('/api/calendar', async (req, res) => {
    const { title, description, eventDate } = req.body;
    if (!title || !description || !eventDate) {
        return res.status(400).json({ error: 'Title, description, and event date are required' });
    }
    try {
        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, description)
            .input('EventDate', sql.Date, eventDate)
            .query('INSERT INTO CalendarEvents (Title, Description, EventDate) VALUES (@Title, @Description, @EventDate)');
        res.status(200).json({ message: 'Event added successfully' });
    } catch (error) {
        console.error('Error adding calendar event:', error);
        res.status(500).json({ error: 'Failed to add event' });
    }
});

app.put('/api/calendar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, eventDate } = req.body;

        console.log('Received PUT /api/calendar/:id at', new Date().toISOString());
        console.log('Request data:', { id, title, description, eventDate });

        // Validate required fields
        if (!title || !description || !eventDate) {
            console.log('Missing required fields:', { title, description, eventDate });
            return res.status(400).json({ error: 'Title, description, and event date are required' });
        }

        // Validate eventDate format
        const parsedEventDate = new Date(eventDate);
        if (isNaN(parsedEventDate)) {
            console.log('Invalid eventDate format:', eventDate);
            return res.status(400).json({ error: 'Invalid event date format. Use YYYY-MM-DD' });
        }

        const pool = await sql.connect(dbConfig);

        // Check if event exists
        const checkExists = await pool.request()
            .input('Id', sql.Int, id)
            .query('SELECT * FROM CalendarEvents WHERE Id = @Id');
        if (checkExists.recordset.length === 0) {
            console.log('No event found for ID:', id);
            return res.status(404).json({ error: 'Event not found' });
        }

        // Execute update
        const result = await pool.request()
            .input('Id', sql.Int, id)
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, description)
            .input('EventDate', sql.Date, parsedEventDate)
            .query('UPDATE CalendarEvents SET Title = @Title, Description = @Description, EventDate = @EventDate WHERE Id = @Id');

        console.log('Rows affected:', result.rowsAffected[0]);

        if (result.rowsAffected[0] === 0) {
            console.log('No rows updated for ID:', id);
            return res.status(404).json({ error: 'Event not found' });
        }

        console.log('Event updated successfully');
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        console.error('Error updating calendar event:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            sqlState: error.sqlState
        });
        res.status(500).json({ error: 'Failed to update event' });
    }
});

app.delete('/api/calendar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM CalendarEvents WHERE Id = @Id');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

// Monthly plan images
app.get('/api/monthly-plan', async (req, res) => {
    try {
        const files = await fs.promises.readdir(calendarDir);
        // Select the most recent file based on filename timestamp
        const latestFile = files.sort((a, b) => b.localeCompare(a))[0];
        res.json({
            imagePath: latestFile ? `/backend/uploads/Calendar/${latestFile}` : null
        });
    } catch (err) {
        console.error('Error fetching monthly plan image:', err);
        res.status(500).json({ error: 'Failed to fetch monthly plan image' });
    }
});


app.post('/api/monthly-plan', upload.single('image'), async (req, res) => {
    try {
        console.log('Upload request received:', req.file);
        
        if (!req.file) {
            console.log('No file received');
            return res.status(400).json({ error: 'Image is required.' });
        }

        // Log file details
        console.log('File details:', {
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            size: req.file.size
        });

        // Check if file was actually saved
        try {
            const fileExists = fs.existsSync(req.file.path);
            console.log('File exists after upload:', fileExists);
            
            if (fileExists) {
                const stats = fs.statSync(req.file.path);
                console.log('File size on disk:', stats.size);
            }
        } catch (fileError) {
            console.error('Error checking file existence:', fileError);
        }

        // Delete any existing files in Calendar directory
        try {
            const files = await fs.promises.readdir(calendarDir);
            console.log('Existing files in calendar dir:', files);
            
            for (const file of files) {
                if (file !== req.file.filename) { // Don't delete the just uploaded file
                    const filePath = path.join(calendarDir, file);
                    console.log('Deleting old file:', filePath);
                    await fs.promises.unlink(filePath);
                }
            }
        } catch (deleteError) {
            console.error('Error deleting old files:', deleteError);
        }

        res.status(201).json({
            message: 'Monthly plan image uploaded successfully!',
            imagePath: `/backend/uploads/Calendar/${req.file.filename}`
        });

    } catch (err) {
        console.error('Error uploading monthly plan image:', {
            message: err.message,
            stack: err.stack,
            code: err.code
        });
        res.status(500).json({ error: 'Failed to upload monthly plan image' });
    }
});


app.delete('/api/monthly-plan/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(calendarDir, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ message: 'Monthly plan image deleted successfully!' });
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    } catch (err) {
        console.error('Error deleting monthly plan image:', err);
        res.status(500).json({ error: 'Failed to delete monthly plan image' });
    }
});


///Calendar image
app.get('/api/calendar-image', async (req, res) => {
    try{
        const files = await fs.promises.readdir(monthDir);
        const latestFile = files.sort((a,b) => b.localeCompare(a))[0];
        res.json({
            imagePath: latestFile ? `/backend/uploads/Month/${latestFile}` : null
        });
    }
    catch (err) {
        console.error('Error fetching calendar image:', err);
        res.status(500).json({ error: 'Failed to fetch calendar image'});
    }
});


app.post('/api/calendar-image', upload.single('image'), async (req, res) => {
    try{
        console.log('Upload request recieved:', req.file);

        if(!req.file){
            console.log('No file recieved');
            return res.status(400).json({ error: 'Image is required.'});
        }
        
        //log file details
        console.log('File details:', {
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            size: req.file.size
        });

        //check if file was actually saved
        try{
            const fileExists = fs.existsSync(req.file.path);
            console.log('File exists after upload:', fileExists);

            if(fileExists){
                const stats = fs.statSync(req.file.path);
                console.log('File size on disk:', stats.size);
            }
        }
        catch (fileError) {
            console.error('Error checking file existence:', fileError);
        }

        //Delete any existing files in month directory
        try{
            const files = await fs.promises.readdir(monthDir);
            console.log('Existing files in month dir:', files);

            for(const file of files) {
                if(file !== req.file.filename) {
                    const filePath = path.join(monthDir, file);
                    console.log('Deleting old file:', filePath);
                    await fs.promises.unlink(filePath);
                }
            }
        }
        catch (deleteError) {
            console.log('Error deleting old files:', deleteError);    
        }
        res.status(201).json({
        message: 'Calendar image uploaded successfully!',
        imagePath: `/backend/uploads/Month/${req.file.filename}`,
        });
    }

    catch (err) {
        console.error('Error uploading monthly plan image:', {
            message: err.message,
            stack: err.stack,
            code: err.code
        });
        res.status(500).json({ error: 'Failed to upload monthly plan image' });
    }
 });

app.delete('/api/monthly-plan/:filename', async (req, res) => {
    try{
        const { filename } = req.params;
        const filePath = path.join(calendarDir, filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.status(200).json({ message: 'Calendar image deleted successfully!'});
        }
        else{
            res.status(404).json({ error: 'Image not found '});
        }
    }
    catch (err) {
        console.error('Error deleting monthly plan image:', err);
        res.status(500).json({ error: 'Failed to delete calendar image'});
    }
});


// Achievements
app.get('/api/achievements', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT Id, Title, Description, AchievementDate, ImagePath FROM Achievements ORDER BY CreatedAt DESC');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching achievements:', err);
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

app.post('/api/achievements', upload.single('image'), async (req, res) => {
    try {
        console.log(`Received POST /api/achievements at ${new Date().toISOString()}`);
        console.log('Request headers:', req.headers);
        console.log('Request body:', req.body);
        console.log('File:', req.file);

        const { title, description, achievementDate } = req.body;
        const imagePath = req.file ? `/backend/uploads/Achievements/${req.file.filename}` : null;

        if (!title || !description || !achievementDate) {
            console.log('Missing required fields:', { title, description, achievementDate });
            return res.status(400).json({ error: 'Title, description, and achievement date are required.' });
        }

        const parsedDate = new Date(achievementDate);
        if (isNaN(parsedDate)) {
            console.log('Invalid date format:', achievementDate);
            return res.status(400).json({ error: 'Invalid achievement date format. Expected YYYY-MM-DD.' });
        }

        console.log('Connecting to database');
        const pool = await sql.connect(dbConfig);
        console.log('Database connected successfully');

        const request = pool.request()
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, description)
            .input('AchievementDate', sql.Date, achievementDate)
            .input('ImagePath', sql.NVarChar, imagePath);

        console.log('Executing query with inputs:', {
            Title: title,
            Description: description,
            AchievementDate: achievementDate,
            ImagePath: imagePath
        });

        await request.query(
            'INSERT INTO Achievements (Title, Description, AchievementDate, ImagePath) VALUES (@Title, @Description, @AchievementDate, @ImagePath)'
        );

        console.log('Achievement inserted successfully');
        res.status(201).json({ message: 'Achievement added successfully!' });
    } catch (err) {
        console.error('Error adding achievement:', {
            message: err.message,
            stack: err.stack,
            code: err.code,
            sqlState: err.sqlState,
            number: err.number
        });
        res.status(500).json({ error: 'Failed to add achievement' });
    }
});

app.put('/api/achievements/:id', upload.single('image'), async (req, res) => {
    try {
        console.log('Received PUT /api/achievements/:id at', new Date().toISOString());
        console.log('Request params:', req.params);
        console.log('Request body:', req.body);
        console.log('File:', req.file);

        const { id } = req.params;
        const { title, description, achievementDate } = req.body;
        const imagePath = req.file ? `/backend/uploads/Achievements/${req.file.filename}` : null;

        if (!title || !description || !achievementDate) {
            console.log('Missing required fields:', { title, description, achievementDate });
            return res.status(400).json({ error: 'Title, description, and achievement date are required.' });
        }

        const parsedDate = new Date(achievementDate);
        if (isNaN(parsedDate)) {
            console.log('Invalid date format:', achievementDate);
            return res.status(400).json({ error: 'Invalid achievement date format.' });
        }

        const pool = await sql.connect(dbConfig);
        const request = pool.request()
            .input('Id', sql.Int, id)
            .input('Title', sql.NVarChar, title)
            .input('Description', sql.NVarChar, description)
            .input('AchievementDate', sql.Date, achievementDate)
            .input('ImagePath', sql.NVarChar, imagePath);

        console.log('Executing update query with inputs:', {
            Id: id,
            Title: title,
            Description: description,
            AchievementDate: achievementDate,
            ImagePath: imagePath
        });

        const result = await request.query(
            'UPDATE Achievements SET Title = @Title, Description = @Description, AchievementDate = @AchievementDate, ImagePath = @ImagePath WHERE Id = @Id'
        );

        if (result.rowsAffected[0] === 0) {
            console.log('Achievement not found for ID:', id);
            return res.status(404).json({ error: 'Achievement not found' });
        }

        console.log('Achievement updated successfully');
        res.status(200).json({ message: 'Achievement updated successfully!' });
    } catch (err) {
        console.error('Error updating achievement:', {
            message: err.message,
            stack: err.stack,
            code: err.code,
            sqlState: err.sqlState
        });
        res.status(500).json({ error: 'Failed to update achievement' });
    }
});

app.delete('/api/achievements/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('Id', sql.Int, id)
            .query('SELECT ImagePath FROM Achievements WHERE Id = @Id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Achievement not found' });
        }
        const imagePath = result.recordset[0].ImagePath;
        if (imagePath) {
            const imageFullPath = path.join(__dirname, 'Uploads', 'Achievements', path.basename(imagePath));
            if (fs.existsSync(imageFullPath)) {
                fs.unlinkSync(imageFullPath);
            }
        }
        await pool.request()
            .input('Id', sql.Int, id)
            .query('DELETE FROM Achievements WHERE Id = @Id');
        res.status(200).json({ message: 'Achievement deleted successfully!' });
    } catch (err) {
        console.error('Error deleting achievement:', err);
        res.status(500).json({ error: 'Failed to delete achievement' });
    }
});




///communication- add extension file upload
app.get('/api/extension', async (req, res) => {
    try {
        const files = await fs.promises.readdir(extensionsDir);
        const latestFile = files.sort((a,b) => b.localeCompare(a)) [0];
        res.json({
            imagePath: latestFile ? `/backend/uploads/Contacts/${latestFile}` : null
        });
    }
    catch(err) {
        console.error('Erroe fetching extension list:', err);
        res.status(500).json({error: 'Failed to fetch extension list'});
    }
});


//
// app.post('/api/extension', upload.single('extensionList'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }
//     const dataBuffer = fs.readFileSync(req.file.path);
//     const data = await pdfParse(dataBuffer);
//     console.log('PDF Text:', data.text);
//     res.json({ message: 'File uploaded successfully', filename: req.file.filename });
// });

app.post('/api/extension', upload.single('extensionList'), async (req, res) => {
    try {
        console.log('Received POST /api/extension at', new Date().toISOString());
        Console.log('Upload request recieved', req.file);

        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'PDF file is required.' });
        }

        //file details
        Console.log('File details:' , {
            fileName: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            size: req.file.size
        });

        //check if the file was actually saved
        try {
            const fileExists = fs.existsSync(req.file.path);
            console.log('File exists after upload:', fileExists);

            if (fileExists) {
                const stats = fs.statSync(req.file.path);
                console.log('File size on disk:', stats.size);
            }
        }
        catch (fileError) {
            console.error('Error checking file existence:', fileError)
        }

        //delete any existing files in Contacts directory
        try{
            const files = await fs.promises.readdir(extensionsDir);
            console.log('Existing files in Contacts dir', files);

            for (const file of files) {
                if (file !== req.file.filename) {
                    const filePath = path.join(extensionsDir, file);
                    console.log('Deleting old file:', filePath);
                    await fs.promises.unlink(filePath);
                }
            }
        }
        catch (deleteError) {
            console.error('Error deleting old files:', deleteError);
        }
        res.status(201).json({
            message: 'File uploaded successfully!',
            pdfPath: `/backend/uploads/Contacts/$req.file.filename`
        });

    } catch (error) {
        console.error ('Error uploading extension file:', {
            message: err.message,
            stack: err.stack,
            code: err.code
        });
        res.status(500).json({error: 'Failed to upload extension file'})
    }

});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Test endpoint working' });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});