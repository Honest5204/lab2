var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = require('./student');

router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('students', { sinhviens: students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu sinh viên!' });
    }
});
router.get('/students/:id', async (req, res) => {
    try {
        // Lấy ID từ request parameters
        const studentId = req.params.id;

        // Tìm sinh viên theo ID trong MongoDB
        const student = await Student.findById(studentId);

        // Kiểm tra xem sinh viên có tồn tại không
        if (!student) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên với ID cung cấp!' });
        }

        // Trả về thông tin sinh viên
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu sinh viên theo ID!' });
    }
});

module.exports = router;
