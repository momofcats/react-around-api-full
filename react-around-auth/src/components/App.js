import React, { useState, useEffect } from "react";
import {
	Route,
	Switch,
	withRouter,
	useHistory,
	useLocation,
	Redirect,
} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoToolTip";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import success from "../images/success.svg";
import failure from "../images/faliure.svg";
import authApi from "../utils/authApi";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
	const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const [userEmail, setUserEmail] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();
	const location = useLocation();

	function handleLogOut() {
		localStorage.removeItem("jwt");
		setLoggedIn(false);
		history.push("/signin");
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);

		if (isLiked) {
			api.removeLike(card._id).then((newCard) => {
				setCardsOnLike(card._id, newCard);
			});
		} else {
			api.addLike(card._id).then((newCard) => {
				setCardsOnLike(card._id, newCard);
			});
		}
	}

	function handleLogin(credentials) {
		authApi
			.authorize(credentials)
			.then((data) => {
				localStorage.setItem("jwt", data.token);
				api.setToken(data.token);
			})
			.then(() => {
				setUserEmail(credentials.email);
				setLoggedIn(true);
			})
			.then(() => history.push("/"))
			.catch((err) => {
				console.log(err);
			});
	}

	function handleRegister(credentials) {
		authApi
			.register(credentials)
			.then(() => {
				history.push("/signin");
				setIsSuccessPopupOpen(true);
			})
			.catch((err) => {
				console.log(err);
				setIsFailPopupOpen(true);
			});
	}
	function setCardsOnLike(cardId, newCard) {
		const newCards = cards.map((c) => (c._id === cardId ? newCard : c));
		setCards(newCards);
	}

	function handleCardDelete(card) {
		api.delCard(card._id).then((res) => {
			const newCards = cards.filter((c) => c._id !== card._id);
			setCards(newCards);
		});
	}

	function handleAddPlaceSubmit(formData) {
		api
			.postNewCard(formData)
			.then((newCard) => {
				setCards([newCard, ...cards]);
			})
			.then(() => {
				closeAllPopups();
			})
			.catch(console.log);
		console.log(cards);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
		setIsImagePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsImagePopupOpen(false);
		setIsFailPopupOpen(false);
		setIsSuccessPopupOpen(false);
		setSelectedCard({});
	}

	function handleEscKey(evt) {
		if (evt.key === "Escape") {
			closeAllPopups();
		}
	}

	function handleUpdateUser(user) {
		api
			.updateUserInfo(user)
			.then((res) => {
				setCurrentUser(res);
			})
			.then(() => {
				closeAllPopups();
			})
			.catch(console.log);
	}

	function handleUpdateAvatar(avatarUrl) {
		api
			.updateAvatar(avatarUrl)
			.then((res) => {
				setCurrentUser(res);
			})
			.then(() => {
				closeAllPopups();
			})
			.catch(console.log);
	}

	useEffect(() => {
		if (!loggedIn) {
			const jwt = localStorage.getItem("jwt");
			if (jwt) {
				api.setToken(jwt);
				authApi.getContent(jwt).then((res) => {
					if (res) {
						setIsLoading(false);
						setLoggedIn(true);
						setUserEmail(res.email);
						history.push("/");
					}
				});
			} else {
				setIsLoading(false);
			}
		}
	}, []);

	useEffect(() => {
		if(loggedIn){
			api
			.getUserInfo()
			.then((data) => {
				setCurrentUser(data);
			})
			.catch(console.log);
		}
		
	}, [loggedIn]);

	useEffect(() => {
		if(loggedIn) {
			api
			.getInitialCards()
			.then((cards) => {
				setCards(cards);
			})
			.catch(console.log);
		}
	}, [loggedIn]);

	useEffect(() => {
		document.addEventListener("keydown", handleEscKey);

		return () => {
			document.removeEventListener("keydown", handleEscKey);
		};
	}, []);

	if (isLoading) {
		return null;
	}
	return (
		<>
			<Header
				onLogOut={handleLogOut}
				loggedIn={loggedIn}
				userEmail={userEmail}
				route={location.pathname}
			/>
			<CurrentUserContext.Provider value={currentUser}>
				<Switch>
					<Route path="/signin">
						<Login onLogin={handleLogin} title="Log in" />
					</Route>
					<Route path="/signup">
						<Register title="Sign up" onRegister={handleRegister} />
					</Route>
					<ProtectedRoute
						exact
						path="/"
						loggedIn={loggedIn}
						component={Main}
						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
						onEditAvatar={handleEditAvatarClick}
						onCardClick={handleCardClick}
						cards={cards}
						onCardDelete={handleCardDelete}
						onCardLike={handleCardLike}
					/>
					<Route>
						{loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
					</Route>
				</Switch>
				{loggedIn && <Footer />}

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
				<ImagePopup
					isOpen={isImagePopupOpen}
					onClose={closeAllPopups}
					card={selectedCard}
				/>
				<InfoToolTip
					isOpen={isSuccessPopupOpen}
					onClose={closeAllPopups}
					icon={success}
					text="Success! You have now been registered."
				/>
				<InfoToolTip
					isOpen={isFailPopupOpen}
					onClose={closeAllPopups}
					icon={failure}
					text="Oops, something went wrong! Please try again."
				/>
			</CurrentUserContext.Provider>
		</>
	);
}

export default withRouter(App);
