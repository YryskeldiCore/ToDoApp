<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'todo')]
class TodoController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private EntityManagerInterface $entityManager;
    /**
     * @var TodoRepository
     */
    private TodoRepository $todoRepository;

    public function __construct(EntityManagerInterface $em, TodoRepository $todoRepository){
        $this->entityManager = $em;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'todo_read')]
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();

        $arrTodos = [];

        foreach ($todos as $todo){
            $arrTodos[] = $todo->toArray();
        }

        return $this->json($arrTodos);
    }

    #[Route('/create', name: 'todo_create')]
    public function create(Request $request){
        $todoReq = json_decode($request->getContent());
        $todo = new Todo();
        $todo->setName($todoReq->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->json([
                'todo' => $todo->toArray()
            ]);
        } catch (e){
            //error
        }


    }
}
