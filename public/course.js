let app = new Vue({
    el: "#app",
    data:{
        courses:[],
        courseId : ''
    },
    methods: {
        getAllCourses() {
            new Promise((resolve) => {
                axios.get('api/courses').then(function (response) {
                resolve(response.data)
            })
        }).then((data) => {
                console.log(data)
            this.courses = data
            // console.log(this.products)
        }).catch((err)=>{
                console.log(err)
        })
        },
        viewBatches(id){
            this.courseId = id;
            window.location = "batch.html?id="+id;
        }
    }

})
app.getAllCourses();
// app.findAllVendors();