import React, {useEffect} from 'react'

export default function CategoricalProducts(props) {
  
    useEffect(() => {
        console.log(props.products);
    }, [props]);

  return (
    <div>CategoricalProducts</div>
  )
}
