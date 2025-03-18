import { createFileRoute, redirect } from '@tanstack/react-router'
import i18n from '../../lang/i18n'

export const Route = createFileRoute('/_layout/_layout')({
    loader: () => {
        redirect({
            to: `/${i18n.language}`,
            throw: true,
        })
    },
})

