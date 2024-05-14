const CourseModel = require('../models/course')

class AdminController {
    static dashboard = async (req, res) => {
        try {
            const { name, image, email } = req.userdata;
            const data = await CourseModel.find()
            res.render('admin/dashboard', { name: name, image: image, email: email, d: data })
        } catch (error) {
            console.log(error)
        }
    }
    static update_status = async (req, res) => {
        try {
            //console.log(req.body)
            const { comment, name, email, status } = req.body
            await CourseModel.findByIdAndUpdate(req.params.id, {
                comment: comment,
                status: status
            })
            //this.sendEmail(name, email, status, comment)
            res.redirect('/admin/dashboard')
        } catch {
            console.log(error)
        }
    }
}
module.exports = AdminController;