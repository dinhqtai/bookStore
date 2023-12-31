import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneUserQuery, useUpdateUserMutation } from '../../../services/user.service';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { Divider, Form, Image, message } from 'antd';
import { useEffect, useState } from 'react';
import { uploadImages } from '../../../api/upload';
import { InputProduct } from '../../../interfaces/product';
import UploadButton from '../../../components/UploadButton/UploadButton';
import Loading from '../../../components/Loading/Loading';
const UserPage = () => {
   const [form] = Form.useForm();
   const [files, setFiles] = useState<File[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const {
      handleSubmit,
      register,
      reset,
      formState: { errors }
   } = useForm();
   const [update] = useUpdateUserMutation();
   const navigate = useNavigate();
   const { id } = useParams();
   const { data } = useGetOneUserQuery(id!);
   // console.log(data);

   useEffect(() => {
      reset({
         name: data?.user?.name,
         email: data?.user?.email,
         role: data?.user?.role,
         avatar: data?.user?.avatar,
         phoneNumber: data?.user?.phoneNumber
      });
   }, [data]);
   // console.log(data);
   const onHandleCheckRole = () => {
      if (data?.user?.role == 'admin') {
         navigate('/admin/user');
      } else {
         navigate('/');
      }
   };

   const onHandleSubmit = async (item: any) => {
      try {
         setLoading(true);
         const {
            data: { data }
         } = await uploadImages(files);
         const imagesUploaded = data.map((image) => image.url);
         form.setFieldValue('images', imagesUploaded);
         item.avatar = data[0].url;
      } catch (error) {
         console.log(error);
      }
      update({ id: id!, item });
      message.success('User updated successfully');
      setLoading(false);
      if (data?.user?.role == 'admin') {
         navigate('/admin/user');
      } else {
         navigate('/');
      }
   };
   const handleGetFiles = (files: File[]) => {
      form.setFieldValue('images', files);
      setFiles(files);
   };
   if (loading) return <Loading sreenSize='lg' />;
   return (
      <>
         <Helmet>
            <title>{data?.user ? data?.user?.email : 'Người dùng'}</title>
         </Helmet>
         <section className='py-40 bg-gray-100  bg-opacity-50'>
            <form onSubmit={handleSubmit(onHandleSubmit)} className='mx-auto  max-w-2xl md:w-3/4 shadow-md'>
               <div className='bg-gray-100 p-4 border-t-2 bg-opacity-5 border-[#d2401e] rounded-t'>
                  <div className='max-w-sm mx-auto md:w-full md:mx-0'>
                     <div className='inline-flex items-center space-x-4'>
                        <Button
                           onClick={() => onHandleCheckRole()}
                           icon={<ArrowLeftOutlined />}
                           className='bg-transparent border-transparent'
                        ></Button>
                        <img
                           className='w-20 h-20 object-cover rounded-full'
                           alt='User avatar'
                           src={data?.user?.avatar}
                        />

                        <h1 className='text-gray-600'>{data?.user?.name}</h1>
                     </div>
                  </div>
               </div>
               <div className='bg-white space-y-6'>
                  <div className='md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center'>
                     <h2 className='md:w-1/3 max-w-sm mx-auto'>Email</h2>
                     <div className='md:w-2/3 max-w-sm mx-auto'>
                        <label className='text-sm text-gray-400'>Email</label>
                        <div className='w-full inline-flex border'>
                           <div className='pt-2 w-1/12 bg-gray-100 bg-opacity-50'>
                              <svg
                                 fill='none'
                                 className='w-6 text-gray-400 mx-auto'
                                 viewBox='0 0 24 24'
                                 stroke='currentColor'
                              >
                                 <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                 />
                              </svg>
                           </div>
                           <input
                              type='email'
                              className='w-11/12 focus:outline-none focus:text-gray-600 p-2'
                              placeholder='email@example.com'
                              value={data?.user?.email}
                           />
                        </div>
                     </div>
                  </div>

                  <hr />
                  <div className='md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center'>
                     <h2 className='md:w-1/3 mx-auto max-w-sm'>Personal info</h2>
                     <div className='md:w-2/3 mx-auto max-w-sm space-y-5'>
                        <div>
                           <label className='text-sm text-gray-400'>Full name</label>
                           <div className='w-full inline-flex border'>
                              <div className='w-1/12 pt-2 bg-gray-100'>
                                 <svg
                                    fill='none'
                                    className='w-6 text-gray-400 mx-auto'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                 >
                                    <path
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                       stroke-width='2'
                                       d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                    />
                                 </svg>
                              </div>
                              <input
                                 type='text'
                                 className='w-11/12 focus:outline-none focus:text-gray-600 p-2'
                                 {...register('name', { required: true, minLength: 3 })}
                              />
                           </div>
                        </div>
                        <div>
                           <label className='text-sm text-gray-400'>Phone number</label>
                           <div className='w-full inline-flex border'>
                              <div className='pt-2 w-1/12 bg-gray-100'>
                                 <svg
                                    fill='none'
                                    className='w-6 text-gray-400 mx-auto'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                 >
                                    <path
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                       stroke-width='2'
                                       d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                                    />
                                 </svg>
                              </div>
                              <input
                                 type='text'
                                 className='w-11/12 focus:outline-none focus:text-gray-600 p-2'
                                 value={data?.user?.phoneNumber}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <hr />
                  <div className='md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center'>
                     <h2 className='md:w-4/12 max-w-sm mx-auto'>Change password</h2>

                     <div className='md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2'>
                        <div className='w-full inline-flex border-b'>
                           <div className='w-1/12 pt-2'>
                              <svg
                                 fill='none'
                                 className='w-6 text-gray-400 mx-auto'
                                 viewBox='0 0 24 24'
                                 stroke='currentColor'
                              >
                                 <path
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    stroke-width='2'
                                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                                 />
                              </svg>
                           </div>
                           <input
                              {...register('password', { required: true, minLength: 3 })}
                              type='password'
                              className='w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4'
                              placeholder='New'
                           />
                        </div>
                     </div>

                     <div className='md:w-3/12 text-center md:pl-6'>
                        <button className=' text-white w-full mx-auto max-w-sm rounded-md text-center bg-[#d2401e] py-2 px-4 inline-flex items-center focus:outline-none md:float-right'>
                           <svg fill='none' className='w-4  mr-2' viewBox='0 0 24 24' stroke='currentColor'>
                              <path
                                 stroke-linecap='round'
                                 stroke-linejoin='round'
                                 stroke-width='2'
                                 d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                              />
                           </svg>
                           Update
                        </button>
                     </div>
                  </div>

                  <hr />
                  <div className='w-2/5 p-4 text-right text-gray-500'>
                     <button className='w-full mx-auto  text-white max-w-sm rounded-md text-center bg-[#d2401e] py-2 px-4 inline-flex items-center focus:outline-none '>
                        <svg fill='none' className='w-4 mr-2' viewBox='0 0 24 24' stroke='currentColor'>
                           <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                           />
                        </svg>
                        Delete account
                     </button>
                  </div>
               </div>
            </form>
         </section>
      </>
   );
};

export default UserPage;
