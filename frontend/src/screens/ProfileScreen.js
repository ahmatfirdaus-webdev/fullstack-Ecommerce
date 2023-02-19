import { getUserDetails, updateUserProfile } from "../actions/userActions";
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  const navigate = useNavigate();


  // const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/';

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const {loading, error, user} = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if(!userInfo){
      navigate('/login') 
    } else {
      if(!user.name) {
        dispatch(getUserDetails('profile')) 
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, navigate, dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password}))
    }
  }

  return (
    <Row>
    <Col md={3}>
      <h2>User Profile</h2>
      {error 
      ? <Message variant='danger'>{error}</Message> : message 
      ? <Message>{message}</Message> : success 
      ? <Message variant='success'>Update Success</Message>: loading 
      ? <Loader /> : <></>  } 
        <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type='name' 
          placeholder="Enter name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
          type='email' 
          placeholder="Enter email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type='password' 
          placeholder="Enter password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
          type='password' 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant='primary'>Update</Button>
      </Form>
    </Col>
    <Col>
    <h2>My Orders</h2>
    </Col>
    </Row>
  )
};

export default ProfileScreen;