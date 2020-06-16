export const localStorage = {
    available: (type) => {
        var storage;
        try {
            storage = window[type];
            var x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                // Firefox를 제외한 모든 브라우저
                (e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // 코드가 존재하지 않을 수도 있기 떄문에 이름 필드도 확인합니다.
                    // Firefox를 제외한 모든 브라우저
                    e.name === "QuotaExceededError" ||
                    // Firefox
                    e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
                storage && storage.length !== 0
            );
        }
    },
    addCurrentChapter: (chapterData) => {
        let currentChapters;
        const localStorage = window['localStorage'];
        try {
            currentChapters = localStorage.getItem('current_chapters');
            currentChapters = JSON.parse(currentChapters);
        } catch (e) {
            console.error('Vue Plugin localStorage.addCurrentChapter Error !! ', e)
        }

        let setNewItem;
        if (currentChapters && currentChapters.length) {
            if (currentChapters.length > 9) {
                currentChapters.pop();
            }
            // 중복 확인
            let foundDup = false;
            for (var i = 0; i < currentChapters.length; i++) {
                if (currentChapters[i].toon_title == chapterData.toon_title) {
                    currentChapters[i] = chapterData;
                    foundDup = true;
                    break;
                }
            }
            if (!foundDup) {
                currentChapters.push(chapterData);
            }
            setNewItem = currentChapters
        } else {
            setNewItem = [chapterData];
        }
        localStorage.setItem('current_chapters', JSON.stringify(setNewItem));
    },
    getCurrentChapter: () => {
        let currentChapters;
        const localStorage = window['localStorage'];
        try {
            currentChapters = localStorage.getItem('current_chapters');
            currentChapters = JSON.parse(currentChapters);
            return currentChapters;
        } catch (e) {
            console.error('Vue Plugin localStorage.getCurrentChapter Error !! ', e)
        }
        return [];
    }
}
