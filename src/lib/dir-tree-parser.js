// 

export class WebAccessibleResourcesExplorer{
    constructor(json){
        this.dir = json;
    }

    list = (path) => {
        let dirNames = path.split('/');
        let cd = this.dir;

        for (const dirName of dirNames) {
            cd = cd.children.find(d => d.name === dirName)
            if (!cd) {
                return []
            }
        }
        const onlyFiles = cd.children.filter(x => !x.children)
        const fileURLs = onlyFiles.map(file => {
            return chrome.runtime.getURL(path + '/' + file.name)
        })
        // const fileURLs = chrome.runtime.getURL()
        return fileURLs
    }
}
