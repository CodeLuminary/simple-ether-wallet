import loadingCss from "../css/components/loading.module.css";
const Loading = ({shouldShow}) =>{
    return (
        <div className={`col-12 ${loadingCss.parent}`} style={{display: shouldShow?"flex":'none'}}>
            <div className={loadingCss.lds_spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loading;