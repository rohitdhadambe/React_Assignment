// One-time Node script: encrypts the plain passwords below with AES
// and writes the result to src/data/users.json.
// Run with: npm run generate:users
import { writeFileSync, mkdirSync } from 'node:fs'
import { encryptPassword } from '../src/utils/crypto.js'

// Demo passwords: every admin uses "admin123", every student uses "student123"
const users = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya.admin@school.com',
    password: 'admin123',
    userType: 'admin',
    language: 'English',
    address: '12 MG Road, Pune',
    standard: null,
    subjects: [],
  },
  {
    id: 2,
    name: 'Rahul Verma',
    email: 'rahul.admin@school.com',
    password: 'admin123',
    userType: 'admin',
    language: 'Hindi',
    address: '45 Park Street, Mumbai',
    standard: null,
    subjects: [],
  },
  {
    id: 3,
    name: 'Aarav Patel',
    email: 'aarav@school.com',
    password: 'student123',
    userType: 'student',
    language: 'English',
    address: '7 Lake View, Pune',
    standard: '6th',
    subjects: ['Maths', 'Science', 'English'],
  },
  {
    id: 4,
    name: 'Ananya Iyer',
    email: 'ananya@school.com',
    password: 'student123',
    userType: 'student',
    language: 'English',
    address: '22 Brigade Road, Bengaluru',
    standard: '7th',
    subjects: ['Maths', 'History', 'Geography'],
  },
  {
    id: 5,
    name: 'Lukas Schmidt',
    email: 'lukas@school.com',
    password: 'student123',
    userType: 'student',
    language: 'German',
    address: '3 Koregaon Park, Pune',
    standard: '8th',
    subjects: ['Science', 'German', 'Maths'],
  },
  {
    id: 6,
    name: 'Sneha Kulkarni',
    email: 'sneha@school.com',
    password: 'student123',
    userType: 'student',
    language: 'Marathi',
    address: '18 Shivaji Nagar, Nashik',
    standard: '9th',
    subjects: ['History', 'Marathi', 'Science'],
  },
  {
    id: 7,
    name: 'Kabir Singh',
    email: 'kabir@school.com',
    password: 'student123',
    userType: 'student',
    language: 'Hindi',
    address: '9 Civil Lines, Delhi',
    standard: '10th',
    subjects: ['Maths', 'Physics', 'Chemistry'],
  },
  {
    id: 8,
    name: 'Emma Müller',
    email: 'emma@school.com',
    password: 'student123',
    userType: 'student',
    language: 'German',
    address: '5 Baner Road, Pune',
    standard: '8th',
    subjects: ['English', 'History', 'Art'],
  },
  {
    id: 9,
    name: 'Ishaan Reddy',
    email: 'ishaan@school.com',
    password: 'student123',
    userType: 'student',
    language: 'Telugu',
    address: '31 Jubilee Hills, Hyderabad',
    standard: '10th',
    subjects: ['Maths', 'Science', 'Computer'],
  },
  {
    id: 10,
    name: 'Meera Nair',
    email: 'meera@school.com',
    password: 'student123',
    userType: 'student',
    language: 'English',
    address: '14 Marine Drive, Kochi',
    standard: '7th',
    subjects: ['Science', 'Geography', 'English'],
  },
]

// encryptPassword is async, so map gives an array of Promises; Promise.all waits for all of them
const encryptedUsers = await Promise.all(
  users.map(async (user) => ({
    ...user,
    password: await encryptPassword(user.password),
  })),
)

const outputDir = new URL('../src/data/', import.meta.url)
mkdirSync(outputDir, { recursive: true })
writeFileSync(
  new URL('users.json', outputDir),
  JSON.stringify(encryptedUsers, null, 2) + '\n',
)

console.log(`Wrote ${encryptedUsers.length} users to src/data/users.json`)
