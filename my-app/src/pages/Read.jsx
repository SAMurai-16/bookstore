import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getProduct } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
const placeholderPdf = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const PDFJS_VERSION = "3.11.174"; 

const Read = () => {
    const dispatch = useDispatch();
    const location = useLocation()
     const getProdId = useMemo(() => location.pathname.split('/')[2], [location]);

         useEffect(() => {
             dispatch(getProduct(getProdId));
            
            
         }, [dispatch, getProdId]);

    const file = useSelector(state=>state?.prod?.singleproduct?.files )

    console.log(file);
    
     
    const pdfUrl = file && file.length > 0 ? "/images/files-1743000920250-474073944.pdf": placeholderPdf;
  return (
    <div>
       <div style={{ height: "600px" }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>

    </div>
  )
}

export default Read
