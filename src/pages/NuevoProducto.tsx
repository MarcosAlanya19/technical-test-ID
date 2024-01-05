import { useAppSelector } from '@/hooks/store';
import { useUserActions } from '@/hooks/useUserActions';
import * as React from 'react';

const NuevoProducto = () => {
  const { addUser } = useUserActions()
  const [result, setResult] = React.useState<'ok' | 'ko' | null>(null)

  const users = useAppSelector((state) => state.users);
  const { removeUser } = useUserActions();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setResult(null)

    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    addUser({ name, email, github })

    form.reset()
  }

  return (
    <div>
      <h2>Agregar nuevo producto</h2>
      <form action=''>
        <div>
          <label htmlFor=''>Nombre producto:</label> <input type='text' />
        </div>
        <div>
          <label htmlFor=''>Precio producto:</label> <input type='text' />
        </div>

        <button type='submit'>Agregar producto</button>
      </form>
    </div>
  );
};

export default NuevoProducto;
