import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';


function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='button-modal-sign-up' onClick={() => setShowModal(true)}>Sign Up</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
