import React, {useState} from 'react';
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import addToMailchimp from 'gatsby-plugin-mailchimp'


const FormBox =  styled.div`
	width:100%;
	max-width:1000px;
	border-radius:10px;
	border:1px solid #dfd8d8;
	height:500px;
	display:flex;
	flex-wrap:wrap;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	padding:10px;

`

export default () => {
	const [email,setEmail] = useState('')
	const [message,setMessage] = useState('Subscribe to Our Newsletter')
	const data = useStaticQuery(graphql`
    query {
      file(sourceInstanceName: { eq: "images" }, name: { eq: "newsletter" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

	const FormSubmit = async (event) => {
		event.preventDefault()
		try{
		const result = await addToMailchimp(email)
		if(result.result === "success"){
			setMessage('Thanks for subscribing')
		}
		else{
			setMessage('You already subscribed to our newsletter')
		}
		}
		catch(error){
			setMessage('something went wrong')
		}
		setEmail('')
	}

	return <FormBox>
			<Img
         	fluid={data.file.childImageSharp.fluid}
          	alt="newsletter"
          	style={{ padding: "0px", width: "100%", maxWidth:'300px' }}
        	/>
			<h3 style={{marginTop:0}}>{message}</h3>
			<form style={{display:'flex',justifyContent:'center',width:'100%',flexWrap:'wrap',alignItems:'baseline'}} onSubmit={FormSubmit}>
			<input type="email" value={email} onChange={(item) => setEmail(item.target.value)} placeholder="Enter your Email" style={{width:"100%",maxWidth:"300px",marginBottom:'5px'}} />
			<button type="submit" style={{marginLeft:'10px',borderRadius:'5px',backgroundColor:'#8dd98d',color:'white'}}>Subscribe</button>
			</form>
			</FormBox>
}	