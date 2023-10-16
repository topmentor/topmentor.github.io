

/** ///////////////////////////////////////////////////////////////
 * 콜백 함수를 통한 데이터 리턴 (매우 중요한 패턴)
 * readFileFromLocal(fileInput, (error, data) => {
        if (error) {
            console.error('오류:', error);
        } else {
            console.log('파일 데이터:', data);
        }
   });
 * 
 */ 
function readFileFromLocal(fileUIId, callback) {

    const fileInput = document.getElementById(fileUIId);

    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        callback(new Error('파일이 선택되지 않았습니다.'), null);
        return;
    }

    const file = fileInput.files[0]; // 선택한 파일 가져오기
    const reader = new FileReader(); // 파일 리더 생성

    reader.onload = function(e) {
        const textContent = e.target.result; // 파일 내용을 변수에 저장
        callback(null, textContent); // 콜백 함수를 통해 데이터를 리턴
    };

    reader.onerror = function(e) {
        callback(new Error('파일을 읽는 중 오류 발생'), null);
    };

    reader.readAsText(file); // 파일을 텍스트로 읽기
}    


/** /////////////////////////////////////////////////////////////////////////////////////
 * 
 * const url = 'https://example.com/data.txt'; // 읽어올 URL을 지정합니다.
    readFileFromURL(url, (error, data) => {
        if (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
        } else {
            console.log('URL로부터 읽은 데이터:', data);
        }
    });
 
 */

function readFileFromURL(url, callback) {
    // const url = 'https://example.com/data.txt'; // 읽어올 URL을 지정합니다.

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('네트워크 오류'); // 오류 처리
        }
        return response.text(); // 텍스트 데이터로 변환
    })
    .then(data => {
        callback(null, data); // 콜백 함수를 통해 데이터를 리턴
    })
    .catch(error => {
        callback(error, null); // 콜백 함수를 통해 오류를 리턴
    });
}


function setMDToHtml(divUICSS, mdText) {

    const divComp = document.querySelector(divUICSS);
    divComp.innerHTML = marked.parse(mdText);
}