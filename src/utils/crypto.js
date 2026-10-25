const SECRET_KEY = 'school-app-demo-secret-key-32chr'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

function getKey() {
  return crypto.subtle.importKey('raw', encoder.encode(SECRET_KEY), 'AES-GCM', false, [
    'encrypt',
    'decrypt',
  ])
}

function toBase64(bytes) {
  return btoa(String.fromCharCode(...bytes))
}

function fromBase64(text) {
  return Uint8Array.from(atob(text), (char) => char.charCodeAt(0))
}


export async function encryptPassword(plainText) {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await getKey()
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plainText),
  )
  return `${toBase64(iv)}:${toBase64(new Uint8Array(encrypted))}`
}

export async function decryptPassword(storedValue) {
  const [ivText, cipherText] = storedValue.split(':')
  const key = await getKey()
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromBase64(ivText) },
    key,
    fromBase64(cipherText),
  )
  return decoder.decode(decrypted)
}
