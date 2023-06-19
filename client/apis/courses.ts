import request from 'superagent'

export async function fetchCourses() {
  const res = await request.get('/api/v1/courses')
  return res.body
}

export async function fetchSingleCourse(id: number) {
  const res = await request.get(`/api/v1/courses/${id}`)
  return res.body
}
