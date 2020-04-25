const updateWord = palabra => {
    return {
        type: 'INCREMENT',
        payload: palabra
    }
};
export default updateWord;