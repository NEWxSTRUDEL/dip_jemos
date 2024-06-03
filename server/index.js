import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jemosv1"
});

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get("/", (req, res) => {
    if (req.session.email) {
        return res.json({
            valid: true,
            email: req.session.email,
            role: req.session.role,
            cookie: req.session.cookie,
            date_start_akk: req.session.date_start_akk,
            ID: req.session.ID,
            name: req.session.name
        });
    } else {
        return res.json({ valid: false });
    }
});

app.get("/buy_course", (req, res) => {
    const q = "SELECT * FROM buy_course";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/date_course", (req, res) => {
    const q = "SELECT * FROM link_course";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/course/types", (req, res) => {
    const q = "SELECT ID_type FROM course";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/type", (req, res) => {
    const q = "SELECT * FROM type";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/type/:ID", (req, res) => {
    const q = "SELECT * FROM type WHERE ID = ?";
    const typeId = req.params.ID;

    db.query(q, [typeId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/user", (req, res) => {
    const q = "SELECT * FROM user";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/user/:ID", (req, res) => {
    const q = "SELECT * FROM user WHERE ID = ?";
    const userId = req.params.ID;

    db.query(q, [userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/author", (req, res) => {
    const q = "SELECT * FROM author";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/author/:ID", (req, res) => {
    const q = "SELECT * FROM author WHERE ID = ?";
    const authorId = req.params.ID;

    db.query(q, [authorId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/course", (req, res) => {
    const q = "SELECT * FROM course";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get("/course/:ID", (req, res) => {
    const q = "SELECT * FROM course WHERE ID = ?";
    const courseId = req.params.ID;

    db.query(q, [courseId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).send('Не удалось выйти из системы');
        } else {
            res.clearCookie('connect.sid');
            res.send('Вы успешно вышли из системы');
        }
    });
});

app.post("/login", (req, res) => {
    const q = "SELECT * FROM user WHERE email = ? and password = ?";
    db.query(q, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        if (result.length > 0) {
            req.session.email = result[0].email;
            req.session.role = result[0].role;
            req.session.date_start_akk = result[0].date_start_akk;
            req.session.ID = result[0].ID;
            req.session.name = result[0].name;
            return res.json({ Login: true });
        } else {
            return res.json({ Login: false });
        }
    });
});

app.post("/buycourse", (req, res) => {
    const q = "INSERT INTO buy_course (id_course, id_user, date) VALUES (?)";
    const values = [
        req.body.id_course,
        req.body.id_user,
        req.body.date,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("yes");
    });
});

app.post("/sendmail", (req, res) => {
    const message = {
        to: req.body.email,
        subject: "Hi",
        text: req.body.message
    };
    console.log(message);
    //mailer(message); // Раскомментируйте и добавьте реализацию
    res.json("Mail sent");
});

app.post("/linkcourse", (req, res) => {
    const q = "INSERT INTO link_course (id_course, id_user, date) VALUES (?)";
    const values = [
        req.body.id_course,
        req.body.id_user,
        req.body.date,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("yes");
    });
});

app.post("/user", (req, res) => {
    const q = "INSERT INTO user (name, email, password, role, date_start_akk) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role,
        req.body.date_start_akk,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("yes go");
    });
});

app.post("/type", (req, res) => {
    const q = "INSERT INTO type (name) VALUES (?)";
    const values = [
        req.body.name,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("yes go");
    });
});

app.post("/author", (req, res) => {
    const q = "INSERT INTO author (name, surname, patronymic, descriptions, img) VALUES (?)";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.patronymic,
        req.body.descriptions,
        req.body.img,
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("yes go");
    });
});

app.post("/course", upload.single("img"), (req, res) => {
    const q = "INSERT INTO course (name, price, date, ID_type, ID_author, descriptions, link, Download, img) VALUES (?)";
    const img = req.file.buffer;
    const values = [
        req.body.name,
        req.body.price,
        req.body.date,
        req.body.ID_type,
        req.body.ID_author,
        req.body.descriptions,
        req.body.link,
        req.body.Download,
        img
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("yes go");
    });
});


app.get("/course/image/:id", (req, res) => {
    const id = req.params.id;
    const q = "SELECT img FROM course WHERE ID = ?";
    db.query(q, [id], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            res.setHeader('Content-Type', 'image/jpeg');
            return res.send(data[0].img);
        }
        return res.status(404).send('Image not found');
    });
});

// Удаления
app.delete("/user/:ID", (req, res) => {
    const userId = req.params.ID;
    const q = "DELETE FROM user WHERE ID = ?";
    db.query(q, [userId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ message: "User deleted" });
    });
});

app.delete("/author/:ID", (req, res) => {
    const authorId = req.params.ID;
    const q = "DELETE FROM author WHERE ID = ?";
    db.query(q, [authorId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ message: "Author deleted" });
    });
});

app.delete("/type/:ID", (req, res) => {
    const typeId = req.params.ID;
    const q = "DELETE FROM type WHERE ID = ?";
    db.query(q, [typeId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ message: "Type deleted" });
    });
});

app.delete("/course/:ID", (req, res) => {
    const courseId = req.params.ID;
    const q = "DELETE FROM course WHERE ID = ?";
    db.query(q, [courseId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ message: "Course deleted" });
    });
});

app.delete("/buy/:ID", (req, res) => {
    const buyId = req.params.ID;
    const q = "DELETE FROM buy_course WHERE ID = ?";
    db.query(q, [buyId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ message: "Buy deleted" });
    });
});

app.delete("/linkcc/:ID", (req, res) => {
    const buyId = req.params.ID;
    const q = "DELETE FROM link_course WHERE ID = ?";
    db.query(q, [buyId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json({ message: "Buy deleted" });
    });
});

// Изменения
app.put("/user/:ID", (req, res) => {
    const userId = req.params.ID;
    const q = "UPDATE user SET `email` = ?, `password` = ?, `role` = ? WHERE ID = ?";
    const values = [
        req.body.email,
        req.body.password,
        req.body.role,
    ];
    db.query(q, [...values, userId], (err, data) => {
        if (err) return res.json(err);
        return res.json("updata go");
    });
});

app.put("/type/:ID", (req, res) => {
    const typeId = req.params.ID;
    const q = "UPDATE type SET `name` = ? WHERE ID = ?";
    const values = [
        req.body.name,
    ];
    db.query(q, [...values, typeId], (err, data) => {
        if (err) return res.json(err);
        return res.json("updata go");
    });
});

app.put("/author/:ID", (req, res) => {
    const authorId = req.params.ID;
    const q = "UPDATE author SET `name` = ?, `surname` = ?, `patronymic` = ?, `descriptions` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.patronymic,
        req.body.descriptions,
    ];
    db.query(q, [...values, authorId], (err, data) => {
        if (err) return res.json(err);
        return res.json("updata go");
    });
});

app.put("/course/:ID", upload.single("img"), (req, res) => {
    const courseId = req.params.ID;
    let q = "UPDATE course SET `name` = ?, `price` = ?, `date` = ?, `ID_type` = ?, `ID_author` = ?, `descriptions` = ?, `link` = ?, `Download` = ?";
    const values = [
        req.body.name,
        req.body.price,
        req.body.date,
        req.body.ID_type,
        req.body.ID_author,
        req.body.descriptions,
        req.body.link,
        req.body.Download,
    ];

    if (req.file) {
        q += ", `img` = ?";
        values.push(req.file.buffer);
    }

    q += " WHERE ID = ?";

    values.push(courseId);

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("updata go");
    });
});
// запуск сервера
app.listen(8800, () => {
    console.log("Server running on port 8800");
});
