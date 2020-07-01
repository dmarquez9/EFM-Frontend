export default (args, creatorRequest, creatorSucces, creatorFailure, request) =>
	async (dispatch) => {
		try {
			dispatch(creatorRequest());
			const { response, error } = await request.apply(this, args);
			if (!error) {
				dispatch(creatorSucces(response));
				return { response };
			}
			dispatch(creatorFailure(error.message || JSON.stringify(error)));
			return { error };
		} catch (error) {
			dispatch(creatorFailure(JSON.stringify(error)));
			return { error };
		}
	};

