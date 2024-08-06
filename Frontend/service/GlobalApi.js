import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    
  }
});
axiosClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject(error.response); // Pass the error response to the calling code
    }
    return Promise.reject(error);
  }
);

const CreateNewResume = (data) =>axiosClient.post('/new', data);

const GetUserResumes=(userEmail)=>axiosClient.post('/resumes',{userEmail});

const UpdateResumeDetail = (id, data) => axiosClient.put(`/update-resume/`, { resumeid: id, ...data });
  

const GetResumeById = (id) => axiosClient.get(`/resumes/${id}?populate=*`);


const DeleteResumeById = (id)=>axiosClient.delete(`/resumes/delete/${id}`)
export default { CreateNewResume, GetUserResumes, UpdateResumeDetail,GetResumeById, DeleteResumeById };
