import React, { useCallback, useState } from 'react';
import HttpAction from 'modules/utils/HttpAction';

const FilesContext = React.createContext({
    state: {
        filesListInfo: {}
    },
    actions: {
        getFilesList: () => { },
        getFiles: () => { },
        saveFiles: () => { },
        updateFiles: () => { },
        deleteFiles: () => { },

        fileListCheck: () => { }
    }
});

const { Provider } = FilesContext;

const FilesProvider = ({ children }) => {

    const [filesListInfo, setFilesListInfo] = useState({ listData: [], responsePage: {} });

    const fileListCheck = (toggleAllFlg, checkedValue, index) => {

        const temp = { ...filesListInfo };
        const tempList = [...temp.listData];

        if (toggleAllFlg) {
            tempList.forEach(e => {
                e.checkFlg = checkedValue;
            })
        } else {
            tempList[index].checkFlg = checkedValue;
        }

        temp.listData = tempList;
        setFilesListInfo(temp);
    }

    const getFilesList = useCallback((requestPage = { page: 1, records: 10 }) => {
        HttpAction({
            url: '/file',
            method: 'get',
            params: { ...requestPage }

        }).then(res => {

        })

    }, []);

    const getFiles = () => {

    }

    const saveFiles = (fileData) => {
        HttpAction({
            url: "/file",
            method: "post",
            fileused: true,
            body: fileData
        }).then((res) => {
            console.log(res);
        })
    }

    const updateFiles = () => {

    }

    const deleteFiles = () => {

    }

    const value = {
        state: {
            filesListInfo
        },
        actions: {
            getFilesList, getFiles, saveFiles, updateFiles, deleteFiles, fileListCheck
        }
    }

    return <Provider value={value}>{children}</Provider>
}

export { FilesContext, FilesProvider };