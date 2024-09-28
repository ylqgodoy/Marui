class rule34{
    /**
     * Creates an instance of rule34
     * 
     * @param {string} baseURL 
     * @memberof rule34
     */

    constructor(baseURL = "https://api.rule34.xxx"){
        this.baseURL = baseURL;
    }

    /**
     * @param {string} URL  
     * @returns json data
     */

    async getData(URL){
        const response = await fetch(URL)
            .then(response => response.json())
            .catch(() => {
                throw "Failed to fetch response"
            })
        return(response)
    }

    
    /**
     * @param {string} keyword 
     * @param {int} pages
     * @returns data of pages
     */

    async getPageData(keyword, pages){
        const page_data = [];  
        for(let i = 0; i < pages; i++){
            const page = await this.getData(`${this.baseURL}/index.php?page=dapi&s=post&q=index&limit=100&json=1&pid=${i}&tags=${keyword}`)
            if(page.length == 0) break;
            page_data.push(page)
        }

        return(page_data)
    }


    /**
     * @param {string} keyword 
     * @param {int} amount 
     * @returns list of URL's
     */

    async getImages(keyword, amount){
        const pages = await this.getPageData(keyword, 4)
  
        const URL_List = []
        for(let i = 0; i < amount; i++){
            let random_page = Math.floor(Math.random() * pages.length)
            let random_img = Math.floor(Math.random() * pages[random_page].length)

            URL_List.push(`${pages[random_page][random_img].file_url}`)
        }

        return(URL_List)
    }
}

module.exports = rule34;