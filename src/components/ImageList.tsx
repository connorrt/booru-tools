const ImageList = ({ images }) => {
    return (
        <div className="row">
            {images ? images.map(elem => {
                return <img src={elem.file.url} width={"300px"} />
            }): "no images :("}
        </div>
    );
};

export default ImageList;

