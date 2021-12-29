/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const res = await fetch(url, {
    method: 'GET',
    responseType: 'arraybuffer',
  });

  return await res.arrayBuffer();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const res = await fetch(url, {
    method: 'GET',
  });

  if (res.status === 401) {
    return null;
  }

  return await res.json();
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const res = await fetch(url, {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })

  return await res.json();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);

  const res = await fetch(url, {
    method: 'POST',
    body: uint8Array,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
